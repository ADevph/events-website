import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";

const Upcoming = () => {

  return (
    <main>
    <SectionTitle title="Upcoming!" subtitle="Exciting Events" />
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
          Better every day
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Let's change it up a bit
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
          error repellat voluptatibus ad.
        </p>
        <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
          Find a class
        </button>
      </div>
      <ShuffleGrid />
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
src:"/public/AIUB_CS_Fest_2017_1.jpg"
},
  {
    id: 2,
    src:"/public/AIUB_CS_Fest_2017_3.jpg"
},
  {
    id: 3,
    src:"/public/AIUB_CS_Fest_2017_4.jpg"
},
  {
    id: 4,
    src:"/public/AIUB_CS_Fest_2017_5.jpg"
},
  {
    id: 5,
    src:"/public/AIUB_CS_Fest_2017_6.jpg"
},
  {
    id: 6,
    src:"/public/aiubview.jpg"
},
  {
    id: 7,
    src:"/public/American_International_University-Bangladesh_Monogram.svg.png"
},
  {
    id: 8,
    src:"/public/AIUB_CS_Fest_2017_3.jpg"
},
  {
    id: 9,
    src:"/public/n1.jpg"
},
  {
    id: 10,
    src:"/public/n2.jpg"
},
  {
    id: 11,
    src:"/public/n3.png"
},
  {
    id: 12,
    src:"/public/AIUB_CS_Fest_2017_1.jpg"
},
  {
    id: 13,
    src:"/public/n4.webp"
},
  {
    id: 14,
    src:"/public/n5.jpg"
},
  {
    id: 15,
    src:"/public/n6.webp"
},
  {
    id: 16,
    src:"/public/n7.png"
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