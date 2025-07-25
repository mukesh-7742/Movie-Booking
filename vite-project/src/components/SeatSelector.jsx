import React from "react";

const SeatSelector = ({ selectedSeats, setSelectedSeats }) => {
  const rows = 5;
  const cols = 8;
  const seatPrice = 150;

  const handleSeatClick = (seatLabel) => {
    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatLabel));
    } else {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  const renderSeats = () => {
    const seatRows = ["A", "B", "C", "D", "E"];
    let seatElements = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= cols; col++) {
        const label = `${seatRows[row]}${col}`;
        const isSelected = selectedSeats.includes(label);

        seatElements.push(
          <div
            key={label}
            className={`w-10 h-10 m-1 flex items-center justify-center rounded cursor-pointer border text-sm
              ${isSelected ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            onClick={() => handleSeatClick(label)}
          >
            {label}
          </div>
        );
      }
    }
    return seatElements;
  };

  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">🎟️ Select Your Seats</h3>
      <div className="grid grid-cols-8 gap-2">{renderSeats()}</div>

      {/* <div className="mt-4 space-y-1 text-sm">
        <p>🧾 <strong>Ticket Price:</strong> ₹{seatPrice} per seat</p>
        <p>💰 <strong>Total Price:</strong> ₹{totalPrice}</p>
        <p>🪑 <strong>Seats Selected:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
      </div> */}
    </div>
  );
};

export default SeatSelector;
