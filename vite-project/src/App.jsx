import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import Booking from "./pages/Booking"; // Booking form for a specific movie
import Bookings from "./pages/Bookings";   // My bookings list

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
  );
}

export default App;
