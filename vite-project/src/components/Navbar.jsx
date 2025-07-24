import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <div className="navbar-logo text-xl font-bold text-indigo-700">
        <Link to="/">🎬 MovieBooking</Link>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-2xl text-indigo-700 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
      >
        {open ? "✖" : "☰"}
      </button>
      {/* Links */}
      <ul
        className={`navbar-links flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-10 transition-all duration-200 ${
          open ? "block" : "hidden md:flex"
        }`}
      >
        <li className="mx-0 md:mx-3 my-2 md:my-0">
          <Link
            to="/"
            className="block px-4 py-2 rounded hover:bg-indigo-100 text-indigo-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="mx-0 md:mx-3 my-2 md:my-0">
          <Link
            to="/movies"
            className="block px-4 py-2 rounded hover:bg-indigo-100 text-indigo-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Movies
          </Link>
        </li>
        <li className="mx-0 md:mx-3 my-2 md:my-0">
          <Link
            to="/bookings"
            className="block px-4 py-2 rounded hover:bg-indigo-100 text-indigo-700 font-medium"
            onClick={() => setOpen(false)}
          >
             My Booking 
          </Link>
        </li>
        <li className="mx-0 md:mx-3 my-2 md:my-0">
          <Link
            to="/login"
            className="block px-4 py-2 rounded hover:bg-indigo-100 text-indigo-700 font-medium"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;