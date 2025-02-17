import React, { useState } from 'react';
import '../../stylesheets/PoliceMeetingsPopup.css';

const PoliceMeetingsPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    locatie: '',
    data: '',
    numeSiPrenume: '',
    cnp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    alert('Cererea a fost trimisă!');
  };

  return (
    <div className="police-popup-overlay">
      <div className="police-popup-container">
        <h2 className="police-popup-title">Rezervare Ședințe Poliție</h2>
        <form className="police-popup-form">
          <div className="police-form-group">
            <label htmlFor="locatie" className="police-form-label">Locație</label>
            <input
              type="text"
              id="locatie"
              name="locatie"
              value={formData.locatie}
              onChange={handleChange}
              className="police-form-input"
              placeholder="Introduceți locația"
            />
          </div>
          <div className="police-form-group">
            <label htmlFor="data" className="police-form-label">Data</label>
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="police-form-input"
            />
          </div>
          <div className="police-form-group">
            <label htmlFor="numeSiPrenume" className="police-form-label">Nume și Prenume</label>
            <input
              type="text"
              id="numeSiPrenume"
              name="numeSiPrenume"
              value={formData.numeSiPrenume}
              onChange={handleChange}
              className="police-form-input"
              placeholder="Introduceți numele complet"
            />
          </div>
          <div className="police-form-group">
            <label htmlFor="cnp" className="police-form-label">CNP</label>
            <input
              type="text"
              id="cnp"
              name="cnp"
              value={formData.cnp}
              onChange={handleChange}
              className="police-form-input"
              placeholder="Introduceți CNP-ul"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="police-submit-button"
          >
            Trimite cerere
          </button>
        </form>
        <button onClick={onClose} className="police-close-button">
          Închide
        </button>
      </div>
    </div>
  );
};

export default PoliceMeetingsPopup;
