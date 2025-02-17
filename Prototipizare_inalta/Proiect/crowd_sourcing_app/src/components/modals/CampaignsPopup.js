import React, { useState, useEffect } from 'react';
import '../../stylesheets/CampaignsPopup.css';
import campaignsData from '../../data/campaignsData';

const CampaignsPopup = ({ onClose }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || campaignsData;
    setCampaigns(savedCampaigns);
  }, []);

  const handleCampaignClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleSignCampaign = () => {
    if (selectedCampaign) {
      const updatedCampaign = {
        ...selectedCampaign,
        signatures: selectedCampaign.signatures + 1,
      };

      const updatedCampaigns = campaigns.map((campaign) =>
        campaign.title === selectedCampaign.title ? updatedCampaign : campaign
      );

      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));

      setCampaigns(updatedCampaigns);
      setSelectedCampaign(updatedCampaign);
    }
  };

  return (
    <div className="campaigns-popup-overlay">
      <div className="campaigns-popup-container">
        <h2 className="campaigns-popup-title">Campanii</h2>
        {campaigns.length > 0 ? (
          <ul className="campaigns-list">
            {campaigns.map((campaign, index) => (
              <li
                key={index}
                className="campaign-item"
                onClick={() => handleCampaignClick(campaign)}
              >
                {campaign.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-campaigns-message">Nu există campanii disponibile în acest moment.</p>
        )}

        {selectedCampaign && (
          <div className="campaign-details-popup">
            <h3>{selectedCampaign.title}</h3>
            <p>{selectedCampaign.description}</p>
            <p>Semnături: {selectedCampaign.signatures}</p>
            <button className="campaign-sign-button" onClick={handleSignCampaign}>
              Semnează
            </button>
            <button className="campaign-close-button" onClick={() => setSelectedCampaign(null)}>
              Închide
            </button>
          </div>
        )}

        <button className="campaigns-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CampaignsPopup;
