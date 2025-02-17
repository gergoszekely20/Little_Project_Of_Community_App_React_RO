import React, { useState, useEffect } from 'react';
import '../../stylesheets/FilteringPopup.css'; 

const FilteringPopup = ({ onClose, selectedStatus, selectedType }) => {
  const [status, setStatus] = useState(selectedStatus);
  const [type, setType] = useState(selectedType);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); 
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleClose = () => {
    onClose(status, type); // Pass both status and type back to the parent
  };

  useEffect(() => {
    setStatus(selectedStatus); 
    setType(selectedType); // Sync type with the selectedType prop
  }, [selectedStatus, selectedType]);

  return (
    <div className="filtering-popup-overlay-custom">
      <div className="filtering-popup-container-custom">
        <h2>Filtreaza</h2>
        
        <div className="filter-section-custom">
          <label htmlFor="status">Status</label>
          <select id="status" value={status} onChange={handleStatusChange}>
            <option value="">Oricare</option>
            <option value="in desfasurare">In Desfasurare</option>
            <option value="programat pentru rezolvare">Programat pentru Rezolvare</option>
            <option value="rezolvat">Rezolvat</option>
          </select>
        </div>
        
        <div className="filter-section-custom">
          <label htmlFor="type">Tip</label>
          <select id="type" value={type} onChange={handleTypeChange}>
            <option value="">Oricare</option>
            <option value="Infrastructura">Infrastructura</option> {/* Corrected values */}
            <option value="Social">Social</option>
            <option value="Circulatie">Circulatie</option>
            <option value="Siguranta">Siguranta</option>
          </select>
        </div>
  
        <div className="popup-buttons-custom">
          <button className="button-custom" onClick={handleClose}>
            {status !== selectedStatus || type !== selectedType ? 'Apply' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilteringPopup;
