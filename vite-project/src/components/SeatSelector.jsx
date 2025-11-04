import React, { useEffect, useState } from "react";
import axios from "axios";

const SeatSelector = ({
  movieId, // 🧠 Pass the movie’s ID as a prop
  selectedSeats,
  setSelectedSeats,
  overrideBookedSeats = [],
}) => {
  const [bookedSeats, setBookedSeats] = useState([]);

  const rows = 5;
  const cols = 8;
  const seatRows = ["A", "B", "C", "D", "E"];

  // ✅ Fetch booked seats dynamically from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const { data } = await axios.get(`/api/bookings/booked-seats/${movieId}`);
        setBookedSeats(data.bookedSeats || []);
      } catch (error) {
        console.error("Error fetching booked seats:", error);
      }
    };

    if (movieId) fetchBookedSeats();
  }, [movieId]);

  // ✅ Handle seat click logic
  const handleSeatClick = (seatLabel) => {
    const isBooked =
      bookedSeats.includes(seatLabel) && !overrideBookedSeats.includes(seatLabel);
    if (isBooked) return;

    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
    } else {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  // ✅ Render seats grid
  const renderSeats = () => {
    let seatElements = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const label = `${seatRows[r]}${c}`;
        const isSelected = selectedSeats.includes(label);
        const isBooked =
          bookedSeats.includes(label) && !overrideBookedSeats.includes(label);

        seatElements.push(
          <div
            key={label}
            role="button"
            tabIndex={isBooked ? -1 : 0}
            aria-disabled={isBooked}
            aria-label={`${label} seat, ${isBooked ? "booked" : "available"}`}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded border text-sm select-none transition
              ${
                isBooked
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : isSelected
                  ? "bg-green-500 text-white cursor-pointer"
                  : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
              }`}
            onClick={() => handleSeatClick(label)}
            onKeyDown={(e) => {
              if (!isBooked && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                handleSeatClick(label);
              }
            }}
          >
            {label}
          </div>
        );
      }
    }
    return seatElements;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🎟️ Select Your Seats</h3>
      <div className="grid grid-cols-8 gap-2">{renderSeats()}</div>

      {/* 🧭 Optional Legend */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 border rounded"></div> Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-500 border rounded"></div> Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-400 border rounded"></div> Booked
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
