import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import CsModal from "./CsModal";
import LoginDemo from "./LoginDemo";
import { motion } from "framer-motion";

const Upcoming = () => {
  const [eventData, setEventData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Add state for selectedEvent
  const [showModal1, setShowModal1] = useState(false);
  const [selectedEvent1, setSelectedEvent1] = useState(null); // Add state for selectedEvent

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/upcoming.json");
        const data = await response.json();
        setEventData(data.events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRegistrationClick = (event) => {
    setSelectedEvent(event); // Set the selected event
    setShowModal(true);
  };
  const handleLoginClick = (event) => {
    setSelectedEvent1(event);
    setShowModal1(true);
  };

  return (
    <main>
      <SectionTitle title="CS FEST 2024" subtitle="Exciting Upcoming Events" />
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <span className="block mb-4 text-sm md:text-base text-indigo-500 font-medium">
            CS FEST - SEASON 8
          </span>
          <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
            <button
              className="text-sm text-white font-semibold hover:underline"
              onClick={() => handleRegistrationClick(event)}
            >
              Register yourself
            </button>
          </button>
          <p className="font-semibold md:text-lg text-blue-700 my-4 md:my-6">
            Registration Start: Open now
          </p>
          <p className="font-bold text-blue-600">
            Registration Ends: 20 March, 2024.
          </p>
        </div>
        {showModal && selectedEvent && (
          <CsModal
            event={selectedEvent}
            closeModal={() => setShowModal(false)}
          />
        )}
        {showModal1 && selectedEvent1 && (
          <LoginDemo
            event={selectedEvent1}
            closeModal={() => setShowModal1(false)}
          />
        )}
        <ShuffleGrid />
      </section>

      <section
        id="eventDetails"
        className="py-12 px-8 max-w-6xl mx-auto border border-gray-300 rounded-lg text-justify"
      >
        {Array.isArray(eventData) &&
          eventData.map((event, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Registration</h2>
              {event.eventDetails.map((detail, detailIndex) => (
                <div key={detailIndex}>
                  <p className="mb-2">
                    <strong>Venue:</strong> {detail.venue}
                  </p>
                  <p className="mb-2">
                    <strong>Date:</strong> {detail.date}
                  </p>
                  <p className="mb-2">
                    <strong>Time:</strong> {detail.time}
                  </p>
                  <p className="mb-2">
                    <strong>Rules & Regulations:</strong>{" "}
                    {detail.rulesAndRegulations}
                  </p>
                  <p className="mb-2">
                    <strong>Points of Contact:</strong>
                  </p>
                  <ul className="ml-6">
                    {detail.pointsOfContact &&
                      detail.pointsOfContact.map((contact, contactIndex) => (
                        <li key={contactIndex}>
                          Name: {contact.name}, Room: {contact.room}, Email:{" "}
                          {contact.email}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
  <button
    className=" bg-blue-800 p-2 text-base text-white mt-2 rounded-lg font-semibold hover:underline"
    onClick={handleLoginClick} // Remove the curly braces
  >
    Login
  </button>

            </div>
          ))}
      </section>
    </main>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/public/AIUB_CS_Fest_2017_1.jpg",
  },
  {
    id: 2,
    src: "/public/AIUB_CS_Fest_2017_3.jpg",
  },
  {
    id: 3,
    src: "/public/AIUB_CS_Fest_2017_4.jpg",
  },
  {
    id: 4,
    src: "/public/AIUB_CS_Fest_2017_5.jpg",
  },
  {
    id: 5,
    src: "/public/AIUB_CS_Fest_2017_6.jpg",
  },
  {
    id: 6,
    src: "/public/aiubview.jpg",
  },
  {
    id: 7,
    src: "/public/American_International_University-Bangladesh_Monogram.svg.png",
  },
  {
    id: 8,
    src: "/public/AIUB_CS_Fest_2017_3.jpg",
  },
  {
    id: 9,
    src: "/public/n1.jpg",
  },
  {
    id: 10,
    src: "/public/n2.jpg",
  },
  {
    id: 11,
    src: "/public/n3.png",
  },
  {
    id: 12,
    src: "/public/AIUB_CS_Fest_2017_1.jpg",
  },
  {
    id: 13,
    src: "/public/n4.webp",
  },
  {
    id: 14,
    src: "/public/n5.jpg",
  },
  {
    id: 15,
    src: "/public/n6.webp",
  },
  {
    id: 16,
    src: "/public/n7.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Upcoming;
