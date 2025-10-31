// src/pages/AddMovie.jsx
import React, { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    rating: "",
    description: "",
    duration: "",
    category: "",
    cast: "",
  });
  const [poster, setPoster] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setPoster(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (poster) data.append("poster", poster);

    try {
      const res = await axios.post(`${process.env.API_URL}/api/movies`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("✅ Movie added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add movie.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ))}
        <input type="file" name="poster" onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Movie
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default AddMovie;
