import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import SectionTitle from "../components/SectionTitle";
import RegistrationModal from "../components/RegistrationModal";
import Swal from 'sweetalert2';

const PresentEvent = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Present.json');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegistrationClick = (event) => {
    if (event.endDateTime && new Date(event.endDateTime) < new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'Event Ended',
        text: 'Sorry, the event has ended. Registration is closed.',
      });
    } else {
      setSelectedEvent(event);
      setShowModal(true);
    }
  };

  const filteredEvents = events.filter(event => {
    return event.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <SectionTitle title="Events" subtitle="Current" />
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 mb-4 p-2 bg-sky-50 font-semibold border rounded-lg"
        aria-label="Search events"
      />
      {filteredEvents.length === 0 && (
        <p className="text-center mt-4 text-gray-600 font-bold" role="alert">Nothing found!</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <Link to={`/events/${event.id}`} className="block h-48 overflow-hidden relative" aria-label={`View details of ${event.title}`}>
              {event.photos && event.photos.length > 0 && (
                <img src={event.photos[0]} alt={event.title} className="object-cover w-full h-full" />
              )}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                <p className="text-white text-sm font-semibold">Click to view details <FaArrowRight className="inline-block ml-1" /></p>
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-blue-700 font-semibold">{event.date}</p>
              <div className="mt-2">
                <p className="text-sm font-semibold">Live Updates:</p>
                <ol className="list-decimal list-inside">
                  {event.live_updates.map((update, index) => (
                    <li key={index} className="text-sky-600 font-semibold">{update}</li>
                  ))}
                </ol>
              </div>
              {event.endDateTime && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Ends in:</p>
                  <CountdownTimer endDateTime={event.endDateTime} />
                </div>
              )}
              <div className="mt-2">
                <button className="text-sm text-blue-600 font-semibold hover:underline" onClick={() => handleRegistrationClick(event)}>Register Here</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          closeModal={() => setShowModal(false)}
        />
      )}
    </main>
  );
};
const CountdownTimer = ({ endDateTime }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(endDateTime) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDateTime]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="mr-1">
        {timeLeft[interval]} {interval}
      </span>
    );
  });

  return (
    <div className="text-sm">
      <div className="mb-2">
        {timerComponents.length ? timerComponents : <span className='font-semibold text-blue-800'>Event ended</span>}
      </div>
    </div>
  );
};

export default PresentEvent;
