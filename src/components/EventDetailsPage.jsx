import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        const foundEvent = data.find(event => event.id === parseInt(eventId));
        setEvent(foundEvent);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [eventId]);

  if (loading) return (
    <div className="max-w-3xl mx-auto p-4 flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg mr-2"></span>
      <p className="text-blue-800 font-semibold">Please wait...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-semibold mb-4 text-center">{event.title}</h1>
      <p className="text-black font-semibold mb-4 text-center">{event.date}</p>
      <p className="text-gray-800 text-justify">{event.description}</p>
      <div className='flex justify-center items-center'>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {event.photos.map((photo, index) => (
          <img key={index} src={photo} alt={event.title} className="w-full h-64 rounded-lg " />
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
      <div className="mt-10 flex justify-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default EventDetailPage;
