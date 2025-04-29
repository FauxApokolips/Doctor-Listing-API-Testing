import React from "react";
import "../doctorcard.css";

const DoctorCard = ({ doctor, onClick }) => {
  const specialtyNames = doctor.specialities?.map((s) => s.name) || [];
  const primarySpecialty = specialtyNames[0]?.toLowerCase() || "";

  const specialtyClassMap = {
    dentist: "card-dentist",
    gynecologist: "card-gyno",
    pediatrician: "card-pediatric",
    cardiologist: "card-cardio",
    dermatologist: "card-derma",
    neurologist: "card-neuro",
    orthopedist: "card-ortho",
  };

  const colorClasses = [
    "card-color-1",
    "card-color-2",
    "card-color-3",
    "card-color-4",
    "card-color-5",
  ];

  const hash = (str) =>
    str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const cardClass =
    specialtyClassMap[primarySpecialty] ||
    colorClasses[hash(primarySpecialty) % colorClasses.length];

  const specialtyIconMap = {
    dentist: "🦷",
    gynecologist: "👩‍⚕️",
    pediatrician: "🧒",
    cardiologist: "❤️",
    dermatologist: "🌞",
    neurologist: "🧠",
    orthopedist: "🦴",
    general: "🩺",
  };

  return (
    <div className={`doctor-card ${cardClass}`} onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3 className="doctor-title">{doctor.name}</h3>

      {doctor.photo && (
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="doctor-photo"
        />
      )}

      <p><strong>Clinic:</strong> {doctor.clinic?.name || "N/A"}</p>

      <p><strong>Specialties:</strong>{" "}
        {specialtyNames.length > 0
          ? specialtyNames.map((spec, idx) => {
              const icon =
                specialtyIconMap[spec.toLowerCase()] || "🔹";
              return (
                <span key={idx} className="specialty-tag">
                  {icon} {spec}
                </span>
              );
            })
          : "N/A"}
      </p>

      <p><strong>Experience:</strong> {doctor.experience}</p>
      <p><strong>Fees:</strong> {doctor.fees}</p>

      <p><strong>Available for:</strong>{" "}
        {doctor.video_consult && <span className="badge badge-online">Online</span>}
        {doctor.in_clinic && <span className="badge badge-clinic">In Clinic</span>}
      </p>
    </div>
  );
};

export default DoctorCard;
