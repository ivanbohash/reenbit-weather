import { useEffect, useRef, useState } from "react";
import "./HeaderSearch.css";

export default function HeaderSearch({
  tripItems,
  setTripItems,
  setIsFromFilterUpdate,
}) {
  const itemsBeforeSearch = useRef(tripItems);
  const [searchValue, setSearchValue] = useState("");

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const onFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    const filteredItems = itemsBeforeSearch.current.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setTripItems(filteredItems);
    setIsFromFilterUpdate(true);
  };

  useEffect(() => {
    if (searchValue === "") setTripItems(itemsBeforeSearch.current);
    setIsFromFilterUpdate(false);
  }, [searchValue]);

  const debouncedOnFilterChange = debounce(onFilterChange, 500);
  return (
    <div className="header-container">
      <div className="header-logo row1">
        Weather <span className="bolded">Forecast</span>
      </div>
      <div className="header-input-container">
        <input
          type="text"
          placeholder=" Search your trip"
          className="header-input"
          onChange={debouncedOnFilterChange}
        />
      </div>
    </div>
  );
}
