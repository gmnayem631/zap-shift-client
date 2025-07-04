import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash, FaEye, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/parcels?email=${user.email}`);
      return response.data;
    },
  });
  console.log(parcels);

  const handleView = (parcel) => {
    // View logic here
    console.log("Viewing parcel:", parcel);
  };

  const handlePay = (id) => {
    // Payment logic here
    console.log("Paying for parcel:", id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete parcel "${parcel.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      console.log(result.data);
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/parcels/${parcel._id}`);
          Swal.fire("Deleted!", "The parcel has been deleted.", "success");
          refetch(); // Refresh the list
        } catch (error) {
          Swal.fire("Error", "Something went wrong while deleting.", "error");
          console.log(error);
        }
      }
    });
  };
  return (
    <div className="overflow-x-auto bg-base-100 shadow-md rounded-xl p-4">
      <h2 className="text-2xl font-bold mb-4">Parcels</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td className="capitalize">{parcel.type}</td>
              <td className="capitalize">{parcel.title}</td>
              <td>{new Date(parcel.creation_date).toLocaleString()}</td>
              <td>৳{parcel.deliveryCost}</td>
              <td>
                <span
                  className={`badge text-white font-medium ${
                    parcel.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.paymentStatus}
                </span>
              </td>
              <td className="flex gap-2">
                <button
                  onClick={handleView}
                  className="btn btn-sm btn-info text-white"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handlePay(parcel._id)}
                  disabled={parcel.paymentStatus === "paid"}
                  className="btn btn-sm btn-success text-white"
                >
                  <FaMoneyBillWave />
                </button>
                <button
                  onClick={() => handleDelete(parcel)}
                  className="btn btn-sm btn-error text-white"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
