import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css';

function TennisCourtBookingSystem({ courts, selectedDate }) {
  // Assuming courts is a multi-dimensional array representing the courts' data

  // Filter the courts based on the selectedDate
  const filteredCourts = courts.filter(court => {
    // Your logic here to filter the courts based on selectedDate
    // For example, if courts have a 'date' property, you might compare that to the selectedDate
    // This is a sample illustration; adjust it based on your data structure
    return court.date === selectedDate; // Change 'date' to the actual property that holds the court's date
  });

  return (
    <div className="app-container">
      <h2>Tennis Courts for {selectedDate.toDateString()}</h2>
      {filteredCourts.map((court, index) => (
        // Render the filtered courts based on selectedDate
        // Adjust this part to display the specific courts for the selected date
        <div key={index}>
          {/* Render the court information */}
        </div>
      ))}
    </div>
  );
}

function App() {
  const initialCourts = Array(4)
    .fill(null)
    .map(() =>
      Array(2)
        .fill(null)
        .map(() => Array(2).fill({ name: '', mobile: '', paid: false }))
    );

  const [courts, setCourts] = useState(initialCourts);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addEvent = () => {
    const newEvent = {
      date: selectedDate,
      tennisBooking: true,
      // You can add other event details as needed
    };
    setEvents([...events, newEvent]);
  };

  const handleViewCourts = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app-container">
      <h1 className='court-title'>Tennis Court Booking System</h1>
      <h2 className='tennis-name'>Miami Grass - Thursday Mens</h2>
      <div className="courts">
        {/* ... (existing code for tennis courts) */}
      </div>
      <div className="calendar-section">
        <h2>Calendar</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <button onClick={addEvent}>Add Event</button>
      </div>
      {events.map((event, index) => {
        if (event.date.toDateString() === selectedDate.toDateString() && event.tennisBooking) {
          return (
            <div key={index}>
              <h2>Tennis Booking for {event.date.toDateString()}</h2>
              <button onClick={() => handleViewCourts(event.date)}>View Courts</button>
              <TennisCourtBookingSystem courts={courts} selectedDate={selectedDate} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;
