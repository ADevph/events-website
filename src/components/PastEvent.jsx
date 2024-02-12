// PastEvent.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const PastEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map(event => (
        <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
          <Link to={`/events/${event.id}`} className="block h-48 overflow-hidden relative">
            <img src={event.photos[0]} alt={event.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
              <p className="text-white text-sm font-semibold">Click to view details <FaArrowRight className="inline-block ml-1" /></p>
            </div>
          </Link>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
            <p className="text-blue-700 font-semibold">{event.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastEvent;

