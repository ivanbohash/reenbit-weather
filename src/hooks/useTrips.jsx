import { useEffect, useState } from "react";
import { TRIP_DEFAULT_STATE } from "../common/appDefaults";
import { API_ENDPOINTS } from "../common/endpoints.js";
import { getImageUrl } from "../helpers/getImage";
import { getTodayAndNextWeekDate, getDayOfWeek } from "../helpers/getWeekDates";

const KEY = process.env.REACT_APP_API_KEY;

export function useTrips() {
  const [tripItems, setTripItems] = useState(TRIP_DEFAULT_STATE);
  const [tripStartDate, setTripStartDate] = useState(
    TRIP_DEFAULT_STATE[0].startDate
  );
  const [weekData, setWeekData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weekWeather, setWeekWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFromFilterUpdate, setIsFromFilterUpdate] = useState(false);

  useEffect(
    function () {
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

    if (storageTrips) setTripItems(storageTrips);
  }, []);

  useEffect(
    function () {
      if (isFromFilterUpdate) return;
      localStorage.setItem("trips", JSON.stringify([...tripItems]));
    },
    [tripItems, isFromFilterUpdate]
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

  useEffect(() => {
    const { name } = TRIP_DEFAULT_STATE[0];
    const { today, nextWeek } = getTodayAndNextWeekDate();
    getCurrentWeather(name);
    getWeekWeather(name, today, nextWeek);
  }, []);

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
  console.log(tripStartDate);
  return {
    tripItems: tripItems.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    ),
    weekData,
    currentWeather,
    weekWeather,
    tripStartDate,
    addNewTrip,
    loading,
    weatherForecast,
    setTripItems,
    setIsFromFilterUpdate,
  };
}
