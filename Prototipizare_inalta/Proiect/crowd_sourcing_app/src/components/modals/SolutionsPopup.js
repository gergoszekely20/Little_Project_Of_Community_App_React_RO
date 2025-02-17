import React, { useState, useEffect } from 'react';
import '../../stylesheets/SolutionsPopup.css';
import Rating from 'react-rating-stars-component';

const SolutionsPopup = ({ onClose, marker, handleAddSolution }) => {
  const [newSolution, setNewSolution] = useState('');
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem(`ratings_${marker.description}`)) || {};
    setRatings(savedRatings);
  }, [marker.description]);

  const handleSolutionChange = (e) => {
    setNewSolution(e.target.value);
  };

  const handleSaveSolution = () => {
    if (newSolution) {
      handleAddSolution(newSolution);
      setNewSolution('');
    }
  };

  const handleRatingChange = (index, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [index]: newRating,
    }));
  };

  const saveRatingsToLocalStorage = () => {
    localStorage.setItem(`ratings_${marker.description}`, JSON.stringify(ratings));
    alert('Ratings saved!');
  };

  return (
    <div className="solutions-popup">
      <div className="popup-content">
        <h2>Solutii pentru: {marker.description}</h2>
        <p>Status: {marker.status}</p>

        <div className="scroll-panel">
          <div className="solutions-container">
            {marker.solutions && marker.solutions.length > 0 ? (
              marker.solutions.map((solution, index) => (
                <div key={index} className="solution-item">
                  <div className="solution-background">
                    <textarea
                      value={solution}
                      readOnly
                      className="solution-textarea"
                    />
                  </div>
                  <div className="rating-background">
                    <div className="rating-container">
                      <Rating
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={ratings[index] || 0}
                        onChange={(newRating) => handleRatingChange(index, newRating)}
                      />
                      <span>{ratings[index] ? `Rating: ${ratings[index]}` : 'No rating yet'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No solutions yet.</p>
            )}
          </div>
        </div>

        <textarea
          value={newSolution}
          onChange={handleSolutionChange}
          placeholder="Add a new solution..."
          className="new-solution-textarea"
        />
        <button className="save-button" onClick={handleSaveSolution}>
          Save Solution
        </button>
        <button className="save-button" onClick={saveRatingsToLocalStorage}>
          Save Ratings
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SolutionsPopup;
