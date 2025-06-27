import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import locations from "../../../public/serviceCenter.json";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const [deliveryCost, setDeliveryCost] = useState(null);
  const [formData, setFormData] = useState(null);

  const watchType = watch("type");
  const watchSenderRegion = watch("senderRegion");
  const watchSenderDistrict = watch("senderDistrict");
  const watchReceiverRegion = watch("receiverRegion");
  const watchReceiverDistrict = watch("receiverDistrict");

  const getRegions = () => [
    ...new Set(locations.map((location) => location.region)),
  ];

  const getDistricts = (region) => {
    return locations
      .filter((location) => location.region === region)
      .map((location) => location.district);
  };

  const getAreas = (region, district) => {
    const entry = locations.find(
      (location) => location.region === region && location.district === district
    );
    return entry ? entry.covered_area : [];
  };

  const onSubmit = (data) => {
    const weight = parseFloat(data.weight) || 0;
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    let cost = 0;
    let baseCost = 0;
    let extraKg = 0;
    let extraCost = 0;
    let outOfDistrictCharge = 0;

    if (data.type === "document") {
      baseCost = isSameDistrict ? 60 : 80;
      cost = baseCost;
    } else {
      if (weight <= 3) {
        baseCost = isSameDistrict ? 110 : 150;
        cost = baseCost;
      } else {
        extraKg = weight - 3;
        extraCost = extraKg * 40;
        baseCost = isSameDistrict ? 110 : 150;
        outOfDistrictCharge = isSameDistrict ? 0 : 40;
        cost = baseCost + extraCost + outOfDistrictCharge;
      }
    }

    setDeliveryCost(cost);
    const parcelPayload = {
      ...data,
      parcelId: `P-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      created_by: user?.email,
      creation_date: new Date().toISOString(),
      status: "created",
      paymentStatus: "unpaid",
      deliveryCost: cost,
    };
    setFormData(parcelPayload);

    let breakdownHtml = `
      <div style="text-align: left;">
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Same District:</strong> ${isSameDistrict ? "Yes" : "No"}</p>
        <p><strong>Base Cost:</strong> ৳${baseCost}</p>
        ${
          data.type === "non-document" && extraKg > 0
            ? `<p><strong>Extra Weight (${Math.ceil(
                extraKg.toFixed(2)
              )}kg):</strong> ৳${extraCost}</p>`
            : ""
        }
        ${
          data.type === "non-document" && !isSameDistrict
            ? `<p><strong>Out of District Charge:</strong> ৳${outOfDistrictCharge}</p>`
            : ""
        }
        <hr style="margin: 10px 0;">
        <h3 style="font-size: 1.2rem;"><strong>Total Cost: ৳${cost}</strong></h3>
      </div>
    `;

    Swal.fire({
      title: "Confirm Parcel Details",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Proceed to Payment",
      denyButtonText: "Edit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/parcels", parcelPayload)
          .then((response) => {
            console.log(response.data);
            if (response.data.insertedId) {
              // TODO: redirect to a payment page
              Swal.fire({
                title: "Redirecting",
                text: "Proceeding to payment gateway",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
            // reset();
          })
          .catch((error) => {
            Swal.fire("Error", "Failed to save parcel", "error");
            console.error(error);
          });
        reset();
      } else if (result.isDenied) {
        // let user edit the form
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6">Add Parcel</h1>
      <p className="text-2xl text-gray-500 mb-2">Enter your parcel details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="bg-base-200 p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>
          <div className="flex justify-center flex-col gap-6">
            <div className="flex items-center gap-6">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-blue-500"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-blue-500"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("title")}
              className="input input-bordered w-1/3 rounded-md"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              {...register("weight")}
              className="input input-bordered w-40 rounded-md"
              disabled={watchType !== "non-document"}
            />
          </div>
        </div>

        {/* Sender and Receiver Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className="bg-base-200 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
            <div className="space-y-4">
              <input
                defaultValue="John Doe"
                {...register("senderName", { required: true })}
                placeholder="Sender Name"
                className="input input-bordered w-full"
              />
              <input
                placeholder="Sender Contact"
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {getRegions().map((region) => (
                  <option key={region}>{region}</option>
                ))}
              </select>
              <select
                {...register("senderDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {getDistricts(watchSenderRegion).map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
              <select
                {...register("senderArea", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Area</option>
                {getAreas(watchSenderRegion, watchSenderDistrict).map(
                  (area) => (
                    <option key={area}>{area}</option>
                  )
                )}
              </select>
              <input
                placeholder="Sender Address"
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Pickup Instructions"
                {...register("pickupInstructions", { required: true })}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>

          {/* Receiver Info */}
          <div className="bg-base-200 p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
            <div className="space-y-4">
              <input
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
              <input
                placeholder="Receiver Contact"
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {getRegions().map((region) => (
                  <option key={region}>{region}</option>
                ))}
              </select>
              <select
                {...register("receiverDistrict", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select District</option>
                {getDistricts(watchReceiverRegion).map((district) => (
                  <option key={district}>{district}</option>
                ))}
              </select>
              <select
                {...register("receiverArea", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Area</option>
                {getAreas(watchReceiverRegion, watchReceiverDistrict).map(
                  (area) => (
                    <option key={area}>{area}</option>
                  )
                )}
              </select>
              <input
                placeholder="Receiver Address"
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Delivery Instructions"
                {...register("deliveryInstructions", { required: true })}
                className="textarea textarea-bordered w-full"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black w-full text-lg font-bold mt-4"
        >
          Add Parcel
        </button>
      </form>

      <div className="">
        {deliveryCost !== null && (
          <div className="text-xl mt-4 font-semibold text-center">
            Estimated Delivery Cost: ৳{deliveryCost}
          </div>
        )}
      </div>
      <div className="">
        {formData && (
          <div className="mt-6 p-4 bg-base-200 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">
              Last Submitted Parcel Info:
            </h2>
            <p>
              <strong>Sender:</strong> {formData.senderName}
            </p>
            <p>
              <strong>Receiver:</strong> {formData.receiverName}
            </p>
            <p>
              <strong>Type:</strong> {formData.type}
            </p>
            <p>
              <strong>Weight:</strong> {formData.weight} kg
            </p>
            <p>
              <strong>Submitted At:</strong>{" "}
              {new Date(formData.creation_date).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendParcel;
