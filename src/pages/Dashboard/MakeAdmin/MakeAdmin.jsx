import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email }) => {
    setLoadingUser(true);
    setUserData(null);

    try {
      const res = await axiosSecure.get(`/users/search?email=${email}`);
      setUserData(res.data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "User not found",
        "error"
      );
    } finally {
      setLoadingUser(false);
    }
  };

  const updateRole = async (role) => {
    try {
      const res = await axiosSecure.patch(`/users/${userData.email}/role`, {
        role,
      });

      if (res.data.message) {
        Swal.fire("Success", res.data.message, "success");
        setUserData((prev) => ({ ...prev, role }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Make or Remove Admin</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Enter user email"
          className="input input-bordered w-full"
          {...register("email", { required: true })}
        />
        <button className="btn btn-primary text-black">Search</button>
      </form>

      {loadingUser && <p>Searching...</p>}

      {userData && (
        <div className="border p-4 rounded bg-base-200">
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(userData.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Current Role:</strong> {userData.role || "user"}
          </p>

          <div className="mt-4 flex gap-2">
            {userData.role !== "admin" ? (
              <button
                onClick={() => updateRole("admin")}
                className="btn btn-success"
              >
                Make Admin
              </button>
            ) : (
              <button
                onClick={() => updateRole("user")}
                className="btn btn-warning"
              >
                Remove Admin
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
