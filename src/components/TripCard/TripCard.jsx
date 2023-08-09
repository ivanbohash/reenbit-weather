import { useCallback } from "react";
import "./TripCard.css";

function TripCard({ trip, handleWeather }) {
  const { name, imageUrl, startDate, endDate } = trip;

  function formatDate(date) {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}.${month}.${year}`;
  }

  const handleTripCardClick = useCallback(() => {
    handleWeather(name, startDate, endDate);
  }, [name, startDate, endDate]);

  return (
    <div className="column" onClick={handleTripCardClick}>
      <div className="trip-container">
        <img src={imageUrl} alt={name} />
        <div className="trip-info">
          <p className="city-name">{name}</p>
          <p className="trip-dates">
            {formatDate(startDate)}-{formatDate(endDate)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TripCard;
