import React from "react";
import '../filter.css';
const FilterPanel = ({
  consultationType,
  setConsultationType,
  specialties,
  setSpecialties,
  sortOption,
  setSortOption,
  availableSpecialties = []
}) => {
  const toggleSpecialty = (spec) => {
    if (specialties.includes(spec)) {
      setSpecialties(specialties.filter((s) => s !== spec));
    } else {
      setSpecialties([...specialties, spec]);
    }
  };
  console.log("FilterPanel received specialties:", availableSpecialties);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "2rem"
      }}
    >
      {/* Consultation Type */}
      <div>
        <label><strong>Consultation Type:</strong></label>
        <select
          value={consultationType}
          onChange={(e) => setConsultationType(e.target.value)}
          style={{ marginLeft: "0.5rem", padding: "0.4rem" }}
        >
          <option value="">All</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      {/* Specialties */}
      
      <div className="filter-panel">
  {/* SPECIALTIES (LEFT) */}
  <div className="filter-left">
    <label><strong>Specialties:</strong></label>
    <div className="checkbox-group">
      {(availableSpecialties || []).map((spec, idx) => (
        <label key={idx}>
          <input
            type="checkbox"
            checked={specialties.includes(spec)}
            onChange={() => toggleSpecialty(spec)}
          />
          {" "}{spec}
        </label>
      ))}
    </div>
  </div>
</div>


      {/* Sort Options */}
      <div>
        <label><strong>Sort by:</strong></label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{ marginLeft: "0.5rem", padding: "0.4rem" }}
        >
          <option value="">None</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
