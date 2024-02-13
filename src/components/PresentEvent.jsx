import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import SectionTitle from "../components/SectionTitle";

const PresentEvent = () => {
  const [events, setEvents] = useState([]);

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

  return (
    <div>
      <div className="w-full">
        <SectionTitle title="Events" subtitle="Current" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map(event => (
          <div key={event.id} className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <Link to={`/events/${event.id}`} className="block h-48 overflow-hidden relative">
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
              {/* Live Updates Section */}
              <div className="mt-2">
  <p className="text-sm font-semibold">Live Updates:</p>
  {/* Display live updates with ordered list */}
  <ol className="list-decimal list-inside">
    {event.live_updates.map((update, index) => (
      <li key={index} className="text-sky-600 font-semibold">{update}</li>
    ))}
  </ol>
</div>

              {/* Countdown Timer Section (if applicable) */}
              {event.endDateTime && (
                <div className="mt-2">
                  <p className="text-sm font-semibold">Ends in:</p>
                  {/* Add countdown timer component */}
                  <CountdownTimer endDateTime={event.endDateTime} />
                </div>
              )}
              {/* Registration Link (if available) */}
              {event.registrationLink && event.registrationLink.length > 0 && (
                <div className="mt-2">
                  <a href={event.registrationLink[0]} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 font-semibold hover:underline">Register Here</a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CountdownTimer = ({ endDateTime, liveUpdates }) => {
  // Calculate remaining time
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
      {liveUpdates && (
        <div>
          <p className="text-sm font-semibold">Live Updates:</p>
          <ul className="list-disc list-inside">
            {liveUpdates.map((update, index) => (
              <li key={index}>{update}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

 

export default PresentEvent;