import "./AddNewTrip.css";

function AddNewTrip({ setActive }) {
  return (
    <div className="add-button trip-card">
      <button className="add-btn-content" onClick={() => setActive(true)}>
        <span className="plus-icon">+</span>
        Add Trip
      </button>
    </div>
  );
}

export default AddNewTrip;
