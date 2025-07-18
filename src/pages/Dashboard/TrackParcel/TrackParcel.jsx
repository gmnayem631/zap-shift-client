import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const { parcelId: paramParcelId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [parcelId, setParcelId] = useState(paramParcelId || "");
  const [trackingUpdates, setTrackingUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch tracking updates when parcelId changes (from URL param or manual input)
  useEffect(() => {
    if (!parcelId) {
      setError("");
      return;
    }

    async function fetchTracking() {
      setLoading(true);
      setError("");
      try {
        const res = await axiosSecure.get(`/tracking-updates/${parcelId}`);
        setTrackingUpdates(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch tracking updates. Check parcel ID."
        );
        setTrackingUpdates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTracking();
  }, [parcelId]); // only parcelId here

  // Handle manual search by navigating with parcelId in URL
  const handleSearch = (e) => {
    e.preventDefault();
    if (parcelId.trim()) {
      navigate(`/track/${parcelId.trim()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Track Your Parcel</h1>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <input
          type="text"
          value={parcelId}
          onChange={(e) => setParcelId(e.target.value)}
          placeholder="Enter Parcel Tracking ID"
          className="input input-bordered flex-grow"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && trackingUpdates.length === 0 && parcelId && (
        <p className="text-center text-gray-500">No tracking updates found.</p>
      )}

      {!loading && trackingUpdates.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Tracking Updates for Parcel ID:{" "}
            <span className="font-mono">{parcelId}</span>
          </h2>
          <ul className="steps steps-vertical">
            {trackingUpdates.map(
              ({ _id, status, note, updated_by, updated_at }) => (
                <li key={_id} className="step step-primary mb-4">
                  <div>
                    <strong>Status:</strong> {status}
                  </div>
                  {note && (
                    <div>
                      <strong>Note:</strong> {note}
                    </div>
                  )}
                  <div>
                    <small>
                      Updated by: {updated_by || "system"} |{" "}
                      {new Date(updated_at).toLocaleString()}
                    </small>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackParcel;
