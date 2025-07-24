import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Make sure your root element id

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedRider, setSelectedRider] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Using useQuery from TanStack Query to fetch pending riders
  const {
    data: riders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const openModal = (rider) => {
    setSelectedRider(rider);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRider(null);
    setModalIsOpen(false);
  };

  const updateRiderStatus = async (riderId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/riders/${riderId}/status`, {
        status: newStatus,
      });

      if (res.data.modifiedCount) {
        Swal.fire(
          "Success",
          `Rider application ${
            newStatus === "active" ? "approved" : "cancelled"
          } successfully.`,
          "success"
        );
        refetch(); // Reload riders after update
        closeModal();
      } else {
        Swal.fire("Error", "Failed to update rider status.", "error");
      }
    } catch (error) {
      console.error("Error updating rider status", error);
      Swal.fire("Error", "Failed to update rider status.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-600">
        Failed to load pending riders.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pending Rider Applications</h1>

      {riders.length === 0 ? (
        <p className="text-center text-gray-500">No pending riders found.</p>
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
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phoneNumber}</td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <span className="badge badge-warning">{rider.status}</span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => openModal(rider)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateRiderStatus(rider._id, "active")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => updateRiderStatus(rider._id, "cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for full rider info */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Rider Details"
        className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        {selectedRider && (
          <>
            <h2 className="text-2xl font-bold mb-4">Rider Details</h2>
            <div className="space-y-2 text-left">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Age:</strong> {selectedRider.age || "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region || "N/A"}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district || "N/A"}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedRider.phoneNumber}
              </p>
              <p>
                <strong>National ID:</strong>{" "}
                {selectedRider.nationalId || "N/A"}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </p>
              <p>
                <strong>Bike Registration No:</strong>{" "}
                {selectedRider.bikeRegistrationNumber}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="btn btn-error"
                onClick={() =>
                  updateRiderStatus(selectedRider._id, "cancelled")
                }
              >
                Cancel Application
              </button>
              <button
                className="btn btn-success"
                onClick={() => updateRiderStatus(selectedRider._id, "active")}
              >
                Approve Application
              </button>
              <button className="btn btn-outline" onClick={closeModal}>
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default PendingRiders;
