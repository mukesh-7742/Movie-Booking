import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Booking from "./pages/Booking";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/book/:id" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;
