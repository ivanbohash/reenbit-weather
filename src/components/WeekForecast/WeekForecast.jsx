import "./WeekForecast.css";

function WeekForecast({ data }) {
  const { dayOfWeek, tempMax, tempMin, icon } = data;
  console.log("data:", data);
  return (
    <div className="day-column">
      <div className="weather-container">
        <p className="day-name">{dayOfWeek}</p>
        <div className="image-container">
          <img src={require(`../../common/icons/${icon}.png`)} alt={icon} />
          <p className="celsium">
            {tempMax}&deg;/{tempMin}&deg;
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeekForecast;
