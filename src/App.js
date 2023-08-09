import "./App.css";
import { useTrips } from "./hooks/useTrips";
import MainPage from "./components/MainPage/MainPage";
import TripDetails from "./components/TripDetails/TripDetails";

function App() {
  const {
    tripItems,
    addNewTrip,
    weekData,
    weatherForecast,
    tripStartDate,
    currentWeather,
    loading,
  } = useTrips();

  return (
    <div className="App">
      <div className="Home">
        <div className="split-container">
          <div className="split-item left">
            <MainPage
              tripItems={tripItems}
              addNewTrip={addNewTrip}
              handleWeather={weatherForecast}
              weekData={weekData}
            />
          </div>
          <div className="split-item right">
            <TripDetails
              currentWeather={currentWeather}
              tripStartDate={tripStartDate}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
