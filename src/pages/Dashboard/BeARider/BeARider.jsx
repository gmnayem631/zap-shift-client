import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    age: "",
    region: "",
    district: "",
    phone: "",
    nid: "",
    bikeBrand: "",
    bikeRegNumber: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const fetchRegions = async () => {
      const res = await axiosSecure.get("/service-centers");
      const uniqueRegions = [...new Set(res.data.map((c) => c.region))];
      setRegions(uniqueRegions);
    };
    fetchRegions();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedRegion) {
        const res = await axiosSecure.get(
          "/service-centers?region=" + selectedRegion
        );
        const uniqueDistricts = [...new Set(res.data.map((c) => c.district))];
        setDistricts(uniqueDistricts);
      } else {
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [selectedRegion, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "region") setSelectedRegion(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const riderData = {
      ...formData,
      status: "pending",
      appliedAt: new Date(),
    };
    try {
      const res = await axiosSecure.post("/riders", riderData);
      console.log("Application submitted", res.data);
      // Optionally show toast or navigate
    } catch (err) {
      console.error("Failed to apply as rider", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Apply to Be a Rider</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          value={formData.name}
          readOnly
          className="input input-bordered"
        />
        <input
          name="email"
          value={formData.email}
          readOnly
          className="input input-bordered"
        />

        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
          placeholder="Age"
          className="input input-bordered"
        />

        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="text"
          placeholder="Phone Number"
          className="input input-bordered"
        />

        <input
          name="nid"
          value={formData.nid}
          onChange={handleChange}
          type="text"
          placeholder="NID Number"
          className="input input-bordered"
        />

        <input
          name="bikeBrand"
          value={formData.bikeBrand}
          onChange={handleChange}
          type="text"
          placeholder="Bike Brand"
          className="input input-bordered"
        />

        <input
          name="bikeRegNumber"
          value={formData.bikeRegNumber}
          onChange={handleChange}
          type="text"
          placeholder="Bike Registration Number"
          className="input input-bordered"
        />

        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Additional Information (optional)"
          className="textarea textarea-bordered md:col-span-2"
        />

        <button type="submit" className="btn btn-primary md:col-span-2">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
