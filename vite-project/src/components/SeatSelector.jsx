import React, { useState } from "react";

const SeatSelector = ({ selectedSeats, setSelectedSeats, bookedSeats = [], overrideBookedSeats = [] }) => {
  const rows = 5;
  const cols = 8;
  const seatRows = ["A", "B", "C", "D", "E"];

  const handleSeatClick = (seatLabel) => {
    const isBooked = bookedSeats.includes(seatLabel) && !overrideBookedSeats.includes(seatLabel);
    if (isBooked) return; // disable clicking booked seat except override

    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
    } else {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  const renderSeats = () => {
    let seatElements = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const label = `${seatRows[r]}${c}`;
        const isSelected = selectedSeats.includes(label);
        const isBooked = bookedSeats.includes(label) && !overrideBookedSeats.includes(label);

        seatElements.push(
          <div
            key={label}
            role="button"
            tabIndex={isBooked ? -1 : 0}
            aria-disabled={isBooked}
            aria-label={`${label} seat, ${isBooked ? "booked" : "available"}`}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded border text-sm select-none
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
      {/* Optional: legend or counts */}
    </div>
  );
};

export default SeatSelector;
