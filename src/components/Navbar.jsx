import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center h-14 bg-purple-200 px-10">
        <div className="logo text-2xl font-semibold">
          <span className="text-purple-700">&lt;</span>Password
          <span className="text-purple-700">OP /</span>
          <span className="text-purple-700">&gt;</span>
        </div>
        <div className="hidden md:block">
          <ul className="flex gap-4 ">
            <li>
              <a
                href="/"
                className="hover:text-purple-700 duration-300 font-semibold"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-purple-700 duration-300 font-semibold"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-purple-700 duration-300 font-semibold"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
