import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

function TennisCourtBookingSystem({ courts, selectedDate }) {
  // ... Existing code remains the same
}

function App() {
  const [events, setEvents] = useState([]);
  const [eventsCourts, setEventsCourts] = useState({}); // Store courts for different events
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({ courtIndex: null, rowIndex: null, colIndex: null });
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const courtIsFull = (court) => {
    return court.every((row) => row.every((slot) => slot.name && slot.mobile));
  };

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
      const newCourts = { ...eventsCourts };
      const { courtIndex, rowIndex, colIndex } = currentSlot;
      newCourts[selectedDate.toDateString()][courtIndex][rowIndex][colIndex] = { name, mobile };
      setEventsCourts(newCourts);
      closeModal();
    } else {
      alert('Please provide a valid name and mobile number.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addEvent = () => {
    const newEvent = {
      date: selectedDate,
      tennisBooking: true,
      // Add other event details as necessary
    };
    setEvents([...events, newEvent]);
  };

  useEffect(() => {
    if (!eventsCourts[selectedDate.toDateString()]) {
      const initialCourts = Array(4)
        .fill(null)
        .map(() =>
          Array(2)
            .fill(null)
            .map(() => Array(2).fill({ name: '', mobile: '', paid: false }))
        );
      setEventsCourts({ ...eventsCourts, [selectedDate.toDateString()]: initialCourts });
    }
  }, [selectedDate, eventsCourts]);

  function CalendarComponent({ selectedDate, events }) {
    const tileClassNames = ({ date }) => {
      const isEventDay = events.some(event => event.date.toDateString() === date.toDateString());
      const today = new Date().toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();

      if (isEventDay) {
        if (isSelected) return 'event-day bold-date selected-day';
        return 'event-day bold-date';
      }
  
      
      if (isSelected) return 'selected-day';
      if (today === date.toDateString()) return 'event-day bold-date';

      return '';
    };

    return (
      <Calendar
        tileClassName={tileClassNames}
        onChange={handleDateChange}
        value={selectedDate}
        // other props
      />
    );
  }

  return (
    <div className="app-container">
      <div className="flex-container"></div>
      <div className="calendar-section">
        
        <h2>Calendar</h2>
        <CalendarComponent selectedDate={selectedDate} events={events} />
        <button onClick={addEvent}>Add Event</button>
      </div>
      {events
        .filter((event) => event.date.toDateString() === selectedDate.toDateString() && event.tennisBooking)
        .map((event, index) => (
          <div key={index}>
            <div className="courts">
              {eventsCourts[selectedDate.toDateString()] &&
                eventsCourts[selectedDate.toDateString()].map((court, courtIndex) => (
                  <div key={courtIndex} className={`court ${courtIsFull(court) ? 'green' : 'orange'}`}>
                    <h3 className="court-heading">
                      Court {courtIndex + 1}
                      {courtIsFull(court) && (
                        <svg
                          className="tick"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          width="34"
                          height="34"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                        </svg>
                      )}
                    </h3>
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
          </div>
        ))}
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

export default App;
