import { createAsyncThunk } from "@reduxjs/toolkit";

// fetch forecast data from open-mateo.coma
export const getForeCast = createAsyncThunk("weather/get", async () => {
  return fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return {
        daily: parseDaily(data),
      };
    });
});

function parseDaily({ daily }) {
  return daily.time.map((time, idx) => {
    return {
      time,
      icon: daily.weather_code[idx],
      sunrise: daily.sunrise[idx],
      sunset: daily.sunset[idx],
      high: daily.temperature_2m_max[idx],
      low: daily.temperature_2m_min[idx],
      precip: daily.precipitation_sum[idx],
    };
  });
}

// daily :
// {
//   precipitation_sum [0.016, 0.004, 0.181, 0, 0.035, 0.012, 0.118]
//   sunrise ['2023-12-27T00:16', '2023-12-28T00:17', '2023-12-29T00:17', '2023-12-30T00:17', '2023-12-31T00:17', '2024-01-01T00:17', '2024-01-02T00:16']
//   sunset ['2023-12-27T07:57', '2023-12-28T07:58', '2023-12-29T07:59', '2023-12-30T08:00', '2023-12-31T08:01', '2024-01-01T08:02', '2024-01-02T08:03']
//   temperature_2m_max [45, 49.6, 49.3, 43.8, 46.4, 45.6, 44.2]
//   temperature_2m_min [35.6, 43.3, 42.2, 35.8, 37.9, 35.9, 36.1]
//   time ['2023-12-27', '2023-12-28', '2023-12-29', '2023-12-30', '2023-12-31', '2024-01-01', '2024-01-02']
//   weather_code [61, 61, 80, 3, 61, 3, 61]
// }
