import React, { useState } from 'react';
import '../../stylesheets/ProblemModal.css';

const ProblemModal = ({ onClose, onSubmit, address }) => {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category) {
            onSubmit({ description, category });
            setDescription('');
            setCategory('');
        } else {
            alert('Please select a category.');
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Semnaleaza o Problema</h2>
                {address && (
                    <p>
                        <strong>Adresa:</strong> {address}
                    </p>
                )}
                <form onSubmit={handleSubmit}>
                    <label>
                        Detalii Problema:
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        />
                    </label>
                    <label>
                        Selectati o categorie:
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="" disabled>
                                Selectati o categorie
                            </option>
                            <option value="Infrastructura">Infrastructura</option>
                            <option value="Social">Social</option>
                            <option value="Circulatie">Circulatie</option>
                            <option value="Siguranta">Siguranta</option>
                        </select>
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Trimite</button>
                        <button type="button" onClick={onClose}>
                            Inchide
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProblemModal;
