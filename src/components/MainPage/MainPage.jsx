import React from "react";
import "./MainPage.css";
import AddNewTrip from "../AddNewTrip/AddNewTrip";
import TripCard from "../TripCard/TripCard";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
import ModalForm from "../ModalForm/ModalForm";
import WeekForecast from "../WeekForecast/WeekForecast";
import { useState } from "react";

function MainPage({
  tripItems,
  addNewTrip,
  handleWeather,
  weekData,
  loading,
  setTripItems,
  setIsFromFilterUpdate,
}) {
  const [active, setActive] = useState(false);

  return (
    <>
      <ModalForm
        active={active}
        setActive={setActive}
        addNewTrip={addNewTrip}
      />
      <div className="main-page-container">
        <div className="flex-container">
          <div className="flex-item header-search">
            <HeaderSearch
              setTripItems={setTripItems}
              tripItems={tripItems}
              setIsFromFilterUpdate={setIsFromFilterUpdate}
            />
          </div>

          <div className="flex-item trip-card">
            <div className="column-trip-card">
              {tripItems.map((trip) => (
                <TripCard
                  handleWeather={handleWeather}
                  key={trip.id}
                  trip={trip}
                />
              ))}
            </div>

            <div className="column-add-trip">
              <AddNewTrip setActive={setActive} />
            </div>
          </div>

          <div className="flex-item week">
            <p>Week</p>
          </div>

          <div className="flex-item week-info">
            <div className="columns-container-weather">
              {weekData.map((data, index) => (
                <React.Fragment key={`${index}${data.day}`}>
                  <WeekForecast data={data} key={data.day} loading={loading} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
