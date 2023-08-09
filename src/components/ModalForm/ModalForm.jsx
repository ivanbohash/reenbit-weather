import "./ModalForm.css";
import { useState } from "react";
import citiesData from "../../mockData/citiesData.json";

function ModalForm({ active, setActive, addNewTrip }) {
  const [city, setCity] = useState("Please select a city");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  function getMaxDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 15);
    return maxDate.toISOString().split("T")[0];
  }

  function handleStartDateChange(e) {
    const selectedStartDate = new Date(e.target.value);
    const maxEndDate = new Date(selectedStartDate);
    maxEndDate.setDate(maxEndDate.getDate() + 15);

    if (new Date(endDate) > maxEndDate) {
      setEndDate(maxEndDate.toISOString().split("T")[0]);
    }

    setStartDate(e.target.value);
  }

  function handleEndDateChange(e) {
    setEndDate(e.target.value);
  }

  function closeModal() {
    setActive(false);
  }

  function handleNewTrip() {
    if (city && startDate && endDate) {
      addNewTrip(city, startDate, endDate);
      closeModal();
    }
  }

  return (
    <div className={active ? "modal active" : "modal"} onClick={closeModal}>
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title">Create trip</div>
        <div className="close-modal" onClick={closeModal}>
          x
        </div>
        <hr />
        <div className="form-group">
          <label htmlFor="city">City</label>
          <div>
            <select
              id="country"
              name="country"
              onChange={handleChangeCity}
              value={city}
            >
              <option disabled>Please select a city</option>
              {citiesData.map((el) => {
                return (
                  <option key={el.name} value={el.name}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </div>

          <label htmlFor="start">Start date</label>
          <div className="select-date">
            <input
              type="date"
              onChange={handleStartDateChange}
              id="start"
              name="start"
              value={startDate}
              min={today}
              max={getMaxDate()}
              required
            />
          </div>

          <label htmlFor="end">End date</label>
          <div className="select-date">
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              max={getMaxDate()}
              id="end"
              name="end"
              required
            />
          </div>

          <div className="sbm-btn">
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleNewTrip}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
