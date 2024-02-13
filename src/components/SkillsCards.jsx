import React from "react";
import { skills } from "../Constants/constants";
import { Link } from 'react-router-dom';

const SkillsCards = () => {
  // Splitting the skills into two arrays for the two rows
  const firstRowSkills = skills.slice(0, 3);
  const secondRowSkills = skills.slice(3);

  return (
    <div className="flex flex-col items-center">
      {/* First row */}
      <div className="flex gap-4">
        {firstRowSkills.map((skill, index) => (
          <div
            key={index}
            className="card w-[300px] h-[300px] flex flex-col items-center gap-4 mb-4 ml-1 bg-sky-50 rounded-xl border-2 border-sky-800 cursor-pointer"
          >
            <div className="w-full h-[80px] flex items-center gap-4 p-1 flex-col">
              {skill.photos.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  className="h-[300px] flex justify-center items-center w-[250px]  bg-sky-800 p-1 object-contain"
                  src={photo}
                  alt={`Photo ${photoIndex}`}
                />
              ))}
              <span
                className="text-base"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {skill.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      
      <div className="flex gap-4 mb-4">
        {secondRowSkills.map((skill, index) => (
          <div
            key={index}
            className="card w-[300px] h-[300px] flex flex-col items-center gap-4 bg-sky-50 rounded-xl border-2 border-sky-800 cursor-pointer"
          >
            <div className="w-full h-[80px] flex items-center gap-4 p-1 flex-col">
              {skill.photos.map((photo, photoIndex) => (
                <img
                  key={photoIndex}
                  className="h-[300px] flex justify-center items-center w-[250px]  bg-sky-800 p-1 object-contain"
                  src={photo}
                  alt={`Photo ${photoIndex}`}
                />
              ))}
              <span
                className="text-base"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                }}
              >
                {skill.title}
              </span>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default SkillsCards;
