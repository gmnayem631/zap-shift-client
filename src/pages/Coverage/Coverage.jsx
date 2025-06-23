import React from "react";
import CoverageMap from "./CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();
  console.log(serviceCenters);
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search box will go here */}

      <CoverageMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
