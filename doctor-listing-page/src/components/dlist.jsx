import React from "react";
import DoctorCard from "./dcard";

const DoctorList = ({ doctors, onSelectDoctor }) => {

  if (doctors.length === 0) {
    return <p>No doctors match the selected criteria.</p>;
  }

  return (
    <div>
      {doctors.map((doctor, idx) => (
  <DoctorCard
    key={idx}
    doctor={doctor}
    onClick={() => onSelectDoctor(doctor)} // ✅ pass doctor back to App
  />
))}


    </div>
  );
};

export default DoctorList;
