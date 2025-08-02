import React, { useState } from "react";
import { AlignJustify, X } from 'lucide-react';

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Features",
    },
    {
      id: 2,
      link: "Solutions",
    },
    {
      id: 3,
      link: "Enterprise",
    },
    {
      id: 4,
      link: "Resources",
    },
    {
      id: 5,
      link: "Pricing",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 fixed">
      <div>
        <h1 className="text-5xl font-signature ml-2">Teamsphere</h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
                {link}
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <X/>  : <AlignJustify/>}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-purple-950 to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
                  {link}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
