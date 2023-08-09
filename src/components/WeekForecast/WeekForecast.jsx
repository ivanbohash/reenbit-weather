import ClipLoader from "react-spinners/ClipLoader";
import "./WeekForecast.css";

function WeekForecast({ data, loading }) {
  const { dayOfWeek, tempMax, tempMin, icon } = data;
  return (
    <div className="day-column">
      <div className="weather-container">
        {loading ? (
          <ClipLoader size={50} color="#000" />
        ) : (
          <>
            <p className="day-name">{dayOfWeek}</p>
            <div className="image-container">
              <img
                style={{ width: 90 }}
                src={require(`../../common/icons/${icon}.png`)}
                alt={icon}
              />
              <p className="celsius">
                {tempMax}&deg;/{tempMin}&deg;
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeekForecast;
