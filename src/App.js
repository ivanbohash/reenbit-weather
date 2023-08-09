import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { useTrips } from "./hooks/useTrips";
import MainPage from "./components/MainPage/MainPage";
import TripDetails from "./components/TripDetails/TripDetails";

function App() {
  const {
    tripItems,
    setTripItems,
    addNewTrip,
    weekData,
    weatherForecast,
    tripStartDate,
    currentWeather,
    loading,
    setIsFromFilterUpdate,
  } = useTrips();

  return (
    <GoogleOAuthProvider clientId="758507806748-7hqtfjehktch3540kae7j6vekquqtjvf.apps.googleusercontent.com">
      {" "}
      <div className="App">
        <div className="Home">
          <div className="split-container">
            <div className="split-item left">
              <MainPage
                tripItems={tripItems}
                addNewTrip={addNewTrip}
                handleWeather={weatherForecast}
                weekData={weekData}
                loading={loading}
                setTripItems={setTripItems}
                setIsFromFilterUpdate={setIsFromFilterUpdate}
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
    </GoogleOAuthProvider>
  );
}

export default App;
