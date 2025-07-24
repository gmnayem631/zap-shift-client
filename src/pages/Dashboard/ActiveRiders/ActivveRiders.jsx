import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: riders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/activeRiders");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const deactivateMutation = useMutation({
    mutationFn: async (riderId) => {
      const res = await axiosSecure.patch(`/riders/${riderId}/status`, {
        status: "inactive",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Rider deactivated successfully.", "success");
      queryClient.invalidateQueries({ queryKey: ["activeRiders"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to deactivate rider.", "error");
    },
  });

  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-600">
        Error loading riders: {error.message}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Active Riders</h1>

      <input
        type="text"
        placeholder="Search by name"
        className="input input-bordered mb-4 max-w-xs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredRiders.length === 0 ? (
        <p className="text-center text-gray-500">No active riders found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bike Brand</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phoneNumber}</td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => deactivateMutation.mutate(rider._id)}
                    disabled={deactivateMutation.isLoading}
                  >
                    {deactivateMutation.isLoading
                      ? "Processing..."
                      : "Deactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveRiders;
