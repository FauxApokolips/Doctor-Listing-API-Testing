import React, { useState, useEffect } from "react";
import '../search.css';

const SearchBar = ({ searchTerm, setSearchTerm, doctorNames }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchTerm || !doctorNames) {
      setSuggestions([]);
      return;
    }

    const filtered = doctorNames.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filtered);
  }, [searchTerm, doctorNames]);

  const handleSelect = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };


  return (
    <div style={{ position: "relative", marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search doctor by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            background: "white",
            listStyle: "none",
            padding: "0",
            margin: "0.2rem 0 0",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%"
          }}
        >
          {suggestions.map((name, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(name)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee"
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
