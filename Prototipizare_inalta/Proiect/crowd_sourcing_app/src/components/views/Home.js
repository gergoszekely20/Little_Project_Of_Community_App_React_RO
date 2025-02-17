import React, { useState, useEffect } from 'react';
import DropdownMenu from "../modals/DropdownMenu";
import MapComponent from "../Map/MapComponent";
import ProblemModal from "../modals/ProblemModal";
import FilteringPopup from "../modals/FilteringPopup";
import SolutionsPopup from "../modals/SolutionsPopup";
import CommunityEventsPopup from "../modals/CommunityEventsPopup";
import PoliceMeetingsPopup from "../modals/PoliceMeetingsPopup";
import CampaignsPopup from "../modals/CampaignsPopup";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [clickedMarker, setClickedMarker] = useState(null);
  const [isSolutionsPopupOpen, setIsSolutionsPopupOpen] = useState(false);
  const [newSolution, setNewSolution] = useState('');
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (storedMarkers) {
      setMarkers(storedMarkers);
      setOriginalMarkers(storedMarkers);
    }
  }, []);

  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem('markers', JSON.stringify(markers));
    }
  }, [markers]);

  const handleOptionChange = (option) => {
    if (option === 'Semnaleaza o problema') {
      // Disable filtering when adding a marker
      setIsFiltering(false);
      setSelectedStatus('');
      setSelectedType('');
      setIsAddingMarker(true);  // Enable marker adding mode
    } else if (option === 'Filtreaza') {
      setIsFiltering(true);
      setIsAddingMarker(false);  // Disable marker adding mode
    } else if (option === 'Evenimente comunitare') {
      setActivePopup('communityEvents');
    } else if (option === 'Rezervare sedinte politie') {
      setActivePopup('policeMeetings');
    } else if (option === 'Campanii') {
      setActivePopup('campaigns');
    }
  };
  

  const handlePopupClose = () => {
    setActivePopup(null);
  };

  const handleMapClick = async (e) => {
    if (isAddingMarker) {
      const { lat, lng } = e.latlng;
  
      // Fetch address using reverse geocoding
      const fetchAddress = async () => {
        console.log('API call is in progress...');
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
          );
          const data = await response.json();
          console.log('done');
          return data.address;
        } catch (error) {
          console.error("Failed to fetch address:", error);
          return null;
        }
      };
  
      const address = await fetchAddress();
      const street = address?.road || "Stradă necunoscută";
      const houseNumber = address?.house_number || "";
      const fullAddress = houseNumber ? `${street} ${houseNumber}` : street;
  
      setModalData({ lat, lng, address: fullAddress });
      setIsAddingMarker(false);
  
      // Ensure no map repositioning here unless explicitly needed
      // Avoid setting the map center here
    }
  };
  

const handleModalSubmit = ({ description, category }) => {
  if (modalData) {
    const currentDate = new Date().toLocaleDateString();
    const iconMap = {
      Infrastructura: 'infr_mark.png',
      Social: 'social_mark.png',
      Circulatie: 'road_mark.png',
      Siguranta: 'health_mark.png',
    };

    const newMarker = {
      lat: modalData.lat,
      lng: modalData.lng,
      description,
      category, // Store the category here
      status: "In Desfasurare",
      date: currentDate,
      address: modalData.address, // Include the address in the marker data
      solutions: [],
      icon: iconMap[category] || 'default_icon.png', // Ensure you use the correct icon
    };

    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    setModalData(null);
  }
};




  const handleModalClose = () => {
    setModalData(null);
  };

  const handleFilterClose = (status, type) => {
    setSelectedStatus(status);  // Update status
    setSelectedType(type);      // Update type
    setIsFiltering(false);

    // Filter markers based on both status and type
    const filteredMarkers = originalMarkers.filter((marker) => {
      const matchesStatus = status ? marker.status.toLowerCase() === status.toLowerCase() : true;
      const matchesType = type ? marker.category.toLowerCase() === type.toLowerCase() : true;
      return matchesStatus && matchesType;
    });

    setMarkers(filteredMarkers);
  };

  const handleSolutionsPopupClose = () => {
    setIsSolutionsPopupOpen(false);
  };

  const handleShowSolutions = (marker) => {
    setClickedMarker(marker);
    setIsSolutionsPopupOpen(true);
  };

  const handleAddSolution = (solution) => {
    if (clickedMarker) {
      const updatedMarkers = markers.map((marker) => {
        if (marker === clickedMarker) {
          const updatedMarker = {
            ...marker,
            solutions: [...marker.solutions, solution]
          };

          setClickedMarker(updatedMarker);

          return updatedMarker;
        }
        return marker;
      });

      setMarkers(updatedMarkers);
      setNewSolution('');
    }
  };

  return (
    <div>
      
      <DropdownMenu onOptionChange={handleOptionChange} />
      <MapComponent markers={markers} onMapClick={handleMapClick} onMarkerClick={handleShowSolutions} />
      {modalData && (
        <ProblemModal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
     {isFiltering && (
  <FilteringPopup 
    onClose={handleFilterClose} 
    selectedStatus={selectedStatus}
    selectedType={selectedType} // Pass selectedType here
  />
  
)}


      {isSolutionsPopupOpen && (
        <SolutionsPopup
          onClose={handleSolutionsPopupClose}
          marker={clickedMarker}
          handleAddSolution={handleAddSolution}
        />
      )}

      {activePopup === 'communityEvents' && (
        <CommunityEventsPopup onClose={handlePopupClose} />
      )}
      {activePopup === 'policeMeetings' && (
        <PoliceMeetingsPopup onClose={handlePopupClose} />
      )}
      {activePopup === 'campaigns' && (
        <CampaignsPopup onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Home;
