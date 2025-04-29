import React from "react";
import "../docall.css"; // Optional for styling

const DoctorDetails = ({ doctor, onClose }) => {
  if (!doctor) return null;

  return (
    <div className="doctor-details-backdrop">
      <div className="doctor-details-modal">
        <button onClick={onClose} className="close-btn">Close</button>
        <h2>{doctor.name}</h2>
        {doctor.photo && (
          <img src={doctor.photo} alt={doctor.name} />
        )}
        <p><strong>Intro:</strong> {doctor.doctor_introduction}</p>
        <p><strong>Clinic:</strong> {doctor.clinic?.name}</p>
        <p><strong>Languages:</strong> {doctor.languages?.join(", ")}</p>
        <p><strong>Fees:</strong> {doctor.fees}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Address:</strong> {doctor.clinic?.address_line1}, {doctor.clinic?.address?.locality}, {doctor.clinic?.address?.city}</p>
        <p><strong>Consultation:</strong> 
          {doctor.in_clinic && " In-Clinic "}
          {doctor.video_consult && " Video Consult"}
        </p>
      </div>
    </div>
  );
  
};

export default DoctorDetails;
