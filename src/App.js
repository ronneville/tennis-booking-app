
import React, { useState } from 'react';
import './styles.css';

function TennisCourtBookingSystem() {
  const initialCourts = Array(4)
    .fill(null)
    .map(() =>
      Array(2)
        .fill(null)
        .map(() => Array(2).fill({ name: '', mobile: '' }))
    );

  const [courts, setCourts] = useState(initialCourts);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({ courtIndex: null, rowIndex: null, colIndex: null });
  const [formData, setFormData] = useState({ name: '', mobile: '' });

  const openModal = (courtIndex, rowIndex, colIndex) => {
    setModalOpen(true);
    setCurrentSlot({ courtIndex, rowIndex, colIndex });
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentSlot({ courtIndex: null, rowIndex: null, colIndex: null });
    setFormData({ name: '', mobile: '' });
  };

  const handleModalSubmit = () => {
    const { name, mobile } = formData;
    if (name && mobile) {
      const newCourts = [...courts];
      const { courtIndex, rowIndex, colIndex } = currentSlot;
      newCourts[courtIndex][rowIndex][colIndex] = { name, mobile };
      setCourts(newCourts);
      closeModal();
    } else {
      alert('Please provide a valid name and mobile number.');
    }
  };

  const isNextAvailableSlot = (court, rowIndex, colIndex) => {
    return !court[rowIndex][colIndex].name;
  };

  const courtIsFull = (court) => {
    return court.every((row) => row.every((slot) => slot.name && slot.mobile));
  };

  return (
    <div className="app-container">
      <h1 className='court-title'>Tennis Court Booking System</h1>
      <h2 className='tennis-name'>Miami Grass - Thursday Mens</h2>
      <div className="courts">
        {courts.map((court, courtIndex) => (
          <div key={courtIndex} className={`court ${courtIsFull(court) ? 'green' : 'orange'}`}>
            <h3 className='court-heading'>Court {courtIndex + 1}{courtIsFull(court) && <svg className="tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="34" height="34"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>}</h3>
            {court.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((slot, colIndex) => (
                  <div
                    key={colIndex}
                    className={`square ${slot.name ? 'green' : 'orange'}`}
                    onClick={() => {
                      if (!slot.name) {
                        openModal(courtIndex, rowIndex, colIndex);
                      }
                    }}
                  >
                    {slot.name ? (
                      <>
                        <div>{slot.name}</div>
                        <div>{slot.mobile}</div>
                      </>
                    ) : `Player ${rowIndex * 2 + colIndex + 1}`}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal slide-in">
            <h3>{`Enter Name and Mobile for Court ${currentSlot.courtIndex + 1}, Player ${currentSlot.rowIndex * 2 + currentSlot.colIndex + 1}`}</h3>
            <div className="input-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoComplete="on"
              />
              <label htmlFor="mobile">Mobile:</label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                autoComplete="tel"
              />
            </div>
            <div className="button-group">
            <button onClick={closeModal}>Cancel</button>
              <button onClick={handleModalSubmit}>Submit</button>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TennisCourtBookingSystem />
    </div>
  );
}

export default App;
