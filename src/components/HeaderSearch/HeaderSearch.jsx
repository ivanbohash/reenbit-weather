import "./HeaderSearch.css";

export default function HeaderSearch() {
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
          // value={props.searchQuery}
          // onChange={props.handleSearchChange}
        />
      </div>
    </div>
  );
}
