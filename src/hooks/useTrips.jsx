import { useEffect, useState } from "react";
import { TRIP_DEFAULT_STATE, WEEK_DATA } from "../common/appDefaults";
import { API_ENDPOINTS } from "../common/endpoints.js";
import { getImageUrl } from "../helpers/getImage";
import { sortByStartDate } from "../helpers/sortByStartDate";
import { getTodayAndNextWeekDate, getDayOfWeek } from "../helpers/getWeekDates";

const KEY = process.env.REACT_APP_API_KEY;

export function useTrips() {
  const [tripItems, setTripItems] = useState(TRIP_DEFAULT_STATE);
  const [tripStartDate, setTripStartDate] = useState(
    TRIP_DEFAULT_STATE[0].startDate
  );
  const [weekData, setWeekData] = useState(WEEK_DATA);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weekWeather, setWeekWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const formattedWeatherData = weekWeather?.map((item) => {
    const date = new Date(item.datetime);
    const dayOfWeek = getDayOfWeek(date);

    return {
      dayOfWeek,
      tempMax: item.tempmax,
      tempNin: item.tempmin,
      icon: item.icon,
    };
  });

  useEffect(
    function () {
      console.log("weekWeather", weekWeather);
      const formattedWeatherData = weekWeather?.map((item) => {
        const date = new Date(item.datetime);
        const dayOfWeek = getDayOfWeek(date);

        return {
          dayOfWeek,
          tempMax: item.tempmax,
          tempMin: item.tempmin,
          icon: item.icon,
        };
      });
      setWeekData(formattedWeatherData);
    },
    [weekWeather]
  );

  useEffect(function () {
    const storageTrips = JSON.parse(localStorage.getItem("trips"));

    if (storageTrips) setTripItems(sortByStartDate(storageTrips));
  }, []);

  useEffect(
    function () {
      localStorage.setItem("trips", JSON.stringify([...tripItems]));
    },
    [tripItems]
  );

  function addNewTrip(name, startDate, endDate) {
    setTripItems((prev) => [
      ...prev,
      {
        name,
        imageUrl: getImageUrl(name),
        id: tripItems.length + 1,
        startDate,
        endDate,
        active: false,
      },
    ]);
  }

  async function getCurrentWeather(city) {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_ENDPOINTS.GET_WEATHER}/${city}/today?unitGroup=metric&include=days&key=${KEY}&contentType=json`
      );
      const data = await res.json();
      setCurrentWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getWeekWeather(city, startDate, endDate) {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_ENDPOINTS.GET_WEATHER}/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${KEY}&contentType=json`
      );
      const data = await res.json();
      setWeekWeather(data.days);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function weatherForecast(city, startDate, endDate) {
    const dates = getTodayAndNextWeekDate();
    setTripStartDate(startDate);
    getCurrentWeather(city);
    getWeekWeather(city, dates.today, dates.nextWeek);
  }

  return {
    tripItems,
    weekData,
    currentWeather,
    weekWeather,
    tripStartDate,
    addNewTrip,
    loading,
    weatherForecast,
  };
}
