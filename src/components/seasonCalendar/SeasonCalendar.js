import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./seasonCalendar.css";

export function SeasonCalendar({ dateRange, seasonName }) {
  const { start, end, weekendsOnly } = dateRange;

  const startDate = new Date(start);
  const endDate = new Date(end);

  // Function to check if a date is within the season range
  const isInSeasonRange = (date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const seasonStart = new Date(startDate);
    seasonStart.setHours(0, 0, 0, 0);

    const seasonEnd = new Date(endDate);
    seasonEnd.setHours(0, 0, 0, 0);

    return checkDate >= seasonStart && checkDate <= seasonEnd;
  };

  // Function to check if a date is a weekend
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  // Tile className function to highlight season dates
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (isInSeasonRange(date)) {
        if (weekendsOnly) {
          return isWeekend(date) ? "react-calendar__tile--season" : "";
        }
        return "react-calendar__tile--season";
      }
    }
    return "";
  };

  return (
    <div aria-label={`${seasonName} calendar`}>
      <Calendar
        defaultValue={startDate}
        defaultActiveStartDate={startDate}
        tileClassName={tileClassName}
        minDetail="month"
        showNeighboringMonth={false}
      />
    </div>
  );
}
