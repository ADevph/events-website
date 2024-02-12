// EventDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const foundEvent = data.find(event => event.id === parseInt(eventId));
        setEvent(foundEvent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.date}</p>
      <p className="text-gray-800">{event.description}</p>
      <div className="mt-8 justify-center items-center">
        {/* <h2 className="text-xl font-semibold mb-2">Photos:</h2> */}
        <div className=" justify-center items-centergrid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {event.photos.map((photo, index) => (
            <img src={event.photos[0]} alt={event.title} className="object-cover w-full h-full" />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Key Takeaways:</h2>
        <ul className="list-disc list-inside">
          {event.key_takeaways.map((takeaway, index) => (
            <li key={index} className="mb-2">{takeaway}</li>
          ))}
        </ul>
      </div>
      <div className="mt-10 justify-center items-center text-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EventDetailPage;
