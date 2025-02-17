import React, { useState } from 'react';
import '../../stylesheets/DropdownMenu.css';

const DropdownMenu = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionChange(option); 
    setIsOpen(false); 
  };

  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="dropdown-button" onClick={toggleDropdown}>
        Menu <span className="arrow">▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          <li onClick={() => handleOptionClick('Semnaleaza o problema')}>
            Semnaleaza o problema
          </li>
          <li onClick={() => handleOptionClick('Filtreaza')}>Filtreaza</li>
          <li onClick={() => handleOptionClick('Evenimente comunitare')}>
            Evenimente comunitare
          </li>
          <li onClick={() => handleOptionClick('Rezervare sedinte politie')}>
            Rezervare sedinte politie
          </li>
          <li onClick={() => handleOptionClick('Campanii')}>Campanii</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
