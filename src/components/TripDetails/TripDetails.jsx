import "./TripDetails.css";
import ClipLoader from "react-spinners/ClipLoader";
import CountdownTimer from "../CountDownTimer/CountDownTimer";

function TripDetails({ currentWeather, tripStartDate, loading }) {
  function today() {
    const day = new Date().toLocaleString("en-US", {
      weekday: "long",
    });
    return day;
  }

  const conditionsIcon = currentWeather?.days[0].icon;

  return (
    <div className="trip-details">
      <div className="info">
        {loading ? (
          <ClipLoader size={150} color="#fff" />
        ) : (
          <>
            <h1 className="day">{today()}</h1>
            <div className="temp">
              {conditionsIcon && (
                <img
                  src={require(`../../common/icons/${conditionsIcon}.png`)}
                  alt={conditionsIcon}
                />
              )}
              <span>{currentWeather?.days[0].temp}&deg;C</span>
            </div>
            <p className="city">{currentWeather?.address}</p>
            <CountdownTimer loading={loading} tripStartDate={tripStartDate} />
          </>
        )}
      </div>
    </div>
  );
}

export default TripDetails;
