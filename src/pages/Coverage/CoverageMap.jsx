import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useState } from "react";

// Marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const FlyToDistrict = ({ lat, lng }) => {
  const map = useMap();
  map.setView([lat, lng], 10); // Zoom into the district
  return null;
};

const CoverageMap = ({ serviceCenters }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const popupRefs = useRef([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.toLowerCase().trim();

    const match = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(query)
    );

    if (match) {
      setSelectedCenter(match);
      const index = serviceCenters.indexOf(match);
      // Open popup after small delay
      setTimeout(() => {
        popupRefs.current[index]?.openPopup();
      }, 300);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between">
        <h2 className="text-3xl font-extrabold mb-2 text-center">
          We are available in 64 districts
        </h2>
        <div className="">
          {" "}
          <input
            type="text"
            placeholder="Search district..."
            className="input input-bordered w-72 rounded-tl-xl rounded-bl-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary text-black rounded-tr-xl rounded-br-xl"
          >
            Search
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2"></form>

      {/* Map */}
      <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.8103, 90.4125]} // Dhaka default
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Optional: fly to the district on match */}
          {selectedCenter && (
            <FlyToDistrict
              lat={selectedCenter.latitude}
              lng={selectedCenter.longitude}
            />
          )}

          {/* Markers */}
          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={customIcon}
              ref={(el) => (popupRefs.current[index] = el)}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Areas: {center.covered_area?.join(", ")}
                <br />
                <a
                  href={center.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoverageMap;
