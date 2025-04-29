import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchBar from "./components/searchbar.jsx";
import FilterPanel from "./components/filter.jsx";
import DoctorList from "./components/dlist.jsx";
import DoctorDetails from "./components/docall.jsx";

import './App.css';


function App() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [consultationType, setConsultationType] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    axios
      .get("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((response) => {
        const rawData = response.data;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
      
        // Deduplicate doctors by name
        const seen = new Set();
        const uniqueDoctors = rawData.filter((doc) => {
          const normalizedName = (doc.name || "").replace(/\s+/g, " ").trim().toLowerCase();
          if (seen.has(normalizedName)) return false;
          seen.add(normalizedName);
          return true;
        });
        
      
        setAllDoctors(uniqueDoctors); 
  
        const uniqueSpecialties = Array.from(
          new Set(
            uniqueDoctors.flatMap((doc) =>
              doc.specialities?.map((s) => s.name) || []
            )
          )
        );
        console.log("Extracted specialties:", uniqueSpecialties);
        setAvailableSpecialties(uniqueSpecialties); 
      
        setLoading(false);
      })
      
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
        setLoading(false);
      });
  }, []);
  

  const filteredDoctors = useMemo(() => {
    let result = [...allDoctors];

    if (searchTerm) {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (consultationType === "Online") {
        result = result.filter((d) => d.video_consult === true);
      } else if (consultationType === "Offline") {
        result = result.filter((d) => d.in_clinic === true);
      }
      

      if (specialties.length > 0) {
        result = result.filter((d) =>
          d.specialities?.some((s) => specialties.includes(s.name))
        );
      }
      

    if (sortOption === "fees") {
        result.sort((a, b) => {
          const aFees = parseInt(a.fees?.replace(/[^\d]/g, "") || 0);
          const bFees = parseInt(b.fees?.replace(/[^\d]/g, "") || 0);
          return aFees - bFees;
        });
      } else if (sortOption === "experience") {
        result.sort((a, b) => {
          const aExp = parseInt(a.experience?.replace(/[^\d]/g, "") || 0);
          const bExp = parseInt(b.experience?.replace(/[^\d]/g, "") || 0);
          return bExp - aExp;
        });
      }
      

    return result;
  }, [allDoctors, searchTerm, consultationType, specialties, sortOption]);


  return (
    <div className={darkMode ? "app dark" : "app"}>
  {/* rest of your app */}
    <div className="container" style={{ padding: "2rem" }}>
      
      
<SearchBar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  doctorNames={allDoctors.map((doc) => doc.name)}  // ✅ ADD THIS
/>
<button
  onClick={() => setDarkMode(!darkMode)}
  style={{ position: "fixed", top: 20, right: 20, zIndex: 2000 }}
>
  {darkMode ? "☀️ Mode" : "🌙 Mode"}
</button>

<FilterPanel
  consultationType={consultationType}
  setConsultationType={setConsultationType}
  specialties={specialties}
  setSpecialties={setSpecialties}
  sortOption={sortOption}
  setSortOption={setSortOption}
  availableSpecialties={availableSpecialties}
/>



{loading ? (
  <p>Loading doctors...</p>
) : 
(
<DoctorList
  doctors={filteredDoctors}
  onSelectDoctor={setSelectedDoctor}
/>

)}

{selectedDoctor && (
  <DoctorDetails
    doctor={selectedDoctor}
    onClose={() => setSelectedDoctor(null)}
  />
)}
</div>
    </div>
  );
}

export default App;
