import React from "react";
import { skills } from "../Constants/constants";

const SkillsCards = () => {
  return (
    <div className="flex">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="card w-[300px] h-[300px] flex flex-col items-center  bg-primary-400 rounded-xl border-4 border-primary-600 cursor-pointer"
        >
          <div className="w-full h-[60px] flex items-center gap-2 p-1 flex-col">
            {skill.photos.map((photo, photoIndex) => (
              <img
                key={photoIndex}
                className="h-[50px] flex justify-center items-center w-[50px]  bg-primary-600 rounded-[50%] p-1 object-contain"
                src={photo}
                alt={`Photo ${photoIndex}`}
              />
            ))}
            <span
              className="text-xl"
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
  );
};

export default SkillsCards;
