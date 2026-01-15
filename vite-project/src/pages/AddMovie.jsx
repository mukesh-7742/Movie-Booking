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
  });

  const [poster, setPoster] = useState(null);
  const [cast, setCast] = useState([{ name: "", role: "" }]);
  const [message, setMessage] = useState("");

  // 🔹 Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle file selection
  const handleFileChange = (e) => setPoster(e.target.files[0]);

  // 🔹 Add a new cast field
  const handleAddCast = () => {
    setCast([...cast, { name: "", role: "" }]);
  };

  // 🔹 Update a specific cast member
  const handleCastChange = (index, e) => {
    const updated = [...cast];
    updated[index][e.target.name] = e.target.value;
    setCast(updated);
  };

  // 🔹 Remove a cast member
  const handleRemoveCast = (index) => {
    setCast(cast.filter((_, i) => i !== index));
  };

  // 🔹 Submit movie
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    // ✅ Cast is JSON stringified for backend
    data.append("cast", JSON.stringify(cast));
    if (poster) data.append("poster", poster);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/movies`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage("✅ Movie added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add movie.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🎬 Add Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic info inputs */}
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={formData[key]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        ))}

        {/* Poster upload */}
        <input type="file" name="poster" onChange={handleFileChange} className="w-full" />

        {/* 🎭 Cast section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Cast</h3>
          {cast.map((member, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Actor Name"
                value={member.name}
                onChange={(e) => handleCastChange(index, e)}
                className="border p-2 flex-1 rounded"
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={member.role}
                onChange={(e) => handleCastChange(index, e)}
                className="border p-2 flex-1 rounded"
              />
              {cast.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCast(index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCast}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Cast
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Movie
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddMovie;
