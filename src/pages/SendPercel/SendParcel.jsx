import { useForm } from "react-hook-form";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import locations from "../../../public/serviceCenter.json";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm();

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
    const baseCost = data.type === "document" ? 50 : 100;
    const weightCost =
      data.type === "non-document" ? (parseFloat(data.weight) || 0) * 10 : 0;
    const serviceFee = 20;
    const total = baseCost + weightCost + serviceFee;
    setDeliveryCost(total);
    setFormData({ ...data, creation_date: new Date().toISOString() });
    document.getElementById("confirm_modal").showModal();
  };

  const confirmSubmission = () => {
    toast.success(`Parcel saved! Cost: ৳${deliveryCost}`);
    console.log("Saved:", formData);
    reset();
    document.getElementById("confirm_modal").close();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Toaster />
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
              // disabled={watchType !== "non-document"}
            />
            <input
              type="number"
              step="0.01"
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

      {/* Confirmation Modal */}
      <dialog id="confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delivery Cost: ৳{deliveryCost}</h3>
          <p className="py-4">Do you want to confirm and save this parcel?</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => document.getElementById("confirm_modal").close()}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary text-black"
                onClick={confirmSubmission}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SendParcel;
