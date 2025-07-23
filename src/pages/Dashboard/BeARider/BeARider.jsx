import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import locations from "../../../../public/serviceCenter.json";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchRegion = watch("region");

  const getRegions = () => [
    ...new Set(locations.map((location) => location.region)),
  ];

  const getDistricts = (region) => {
    return locations
      .filter((location) => location.region === region)
      .map((location) => location.district);
  };

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      email: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    axiosSecure
      .post("/rider-applications", riderData)
      .then((res) => {
        console.log(riderData);
        if (res.data.insertedId) {
          Swal.fire(
            "Success",
            "Your application has been submitted!",
            "success"
          );
          // reset();
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Error", "Failed to submit application", "error");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Be a Rider</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">Name is required</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Region</label>
            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Region</option>
              {getRegions().map((region) => (
                <option key={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {getDistricts(watchRegion).map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">National ID Card Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Bike Registration Number</label>
          <input
            type="text"
            {...register("bikeRegistration", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-lg text-black"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
