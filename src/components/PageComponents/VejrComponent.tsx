import React, { useEffect, useState } from "react";

type VejrData = {
  date: string;
  weathercode: number;
  precipitationProb: number;
  uvIndex: number;
  windspeed: number;
  temps: {
    morning: number | null;
    noon: number | null;
    evening: number | null;
    night: number | null;
  };
  humidity: number;
};

const weatherDescriptions: { [code: number]: string } = {
  0: "Klar himmel",
  1: "Delvist skyet",
  2: "Overskyet",
  3: "Skyet",
  45: "Tåge",
  48: "Iskrystaller i tåge",
  51: "Let regn",
  53: "Moderat regn",
  55: "Tung regn",
  61: "Let regn",
  63: "Moderat regn",
  65: "Kraftig regn",
  71: "Let sne",
  73: "Moderat sne",
  75: "Kraftig sne",
  80: "Regnbyger",
  81: "Kraftige regnbyger",
  95: "Torden",
  96: "Torden med hagl",
};

const weatherIcons: { [code: number]: string } = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌧️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  80: "🌦️",
  81: "🌧️",
  95: "⛈️",
  96: "⛈️",
};

const lat = 56.40;
const lon = 10.88;

const VejrComponent: React.FC = () => {
  const [forecast, setForecast] = useState<VejrData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = new URLSearchParams({
          latitude: lat.toString(),/* "56.40" */
          longitude: lon.toString(),/* "10.88" Grenaa */
          timezone: "auto",
          forecast_days: "7",
          daily: [
            "weathercode",
            "precipitation_probability_max",
            "uv_index_max",
            "windspeed_10m_max",
          ].join(","),
          hourly: ["temperature_2m", "relative_humidity_2m"].join(","),
          windspeed_unit: "ms",
        });

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`
        );
        if (!res.ok) throw new Error("Fejl i API kald");

        const data = await res.json();

        const mapForecast: VejrData[] = data.daily.time.map(
          (date: string, index: number) => {
            const findHourIndex = (hour: string) =>
              data.hourly.time.findIndex((t: string) =>
                t.startsWith(`${date}T${hour}:00`)
              );

            const morgen = findHourIndex("06");
            const frokost = findHourIndex("12");
            const aften = findHourIndex("18");
            const nat = findHourIndex("00");

            const getTemp = (index: number) =>
              index !== -1 ? data.hourly.temperature_2m[index] : null;

            // Calculate average humidity for the day (approx by averaging the 4 times)
            const humValues = [morgen, frokost, aften, nat]
              .filter((i) => i !== -1)
              .map((i) => data.hourly.relative_humidity_2m[i]);
            const avgHumidity =
              humValues.reduce((acc, v) => acc + v, 0) / humValues.length || 0;

            return {
              date,
              weathercode: data.daily.weathercode[index],
              precipitationProb: data.daily.precipitation_probability_max[index],
              uvIndex: data.daily.uv_index_max[index],
              windspeed: Math.round(data.daily.windspeed_10m_max[index]),
              temps: {
                morning: getTemp(morgen),
                noon: getTemp(frokost),
                evening: getTemp(aften),
                night: getTemp(nat),
              },
              humidity: avgHumidity,
            };
          }
        );

        setForecast(mapForecast);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Henter vejrdata…</div>;
  if (error) return <div>Fejl: {error}</div>;
  if (!forecast) return null;

  const today = forecast[0];

  if (loading) return <p>Henter vejrdata...</p>;
  if (error) return <p>Fejl: {error}</p>;
  if (!forecast.length) return <p>Ingen data fundet.</p>;

  return (
    <>
      <div className="vejr">
        <div className="vejr_today-left">
          <div className="vejr_today">
            <div>
              <div className="vejr_today-h">
                <h2>Grenå</h2>
                  {//pga dag navne "torsdag" etc. ikke må være med kan jeg ikke nøjes med 1
                    (() => {
                      const now = new Date();
                      const datePart = now.toLocaleDateString("da-DK", {
                        day: "numeric",
                        month: "long",
                      });
                      const timePart = now.toLocaleTimeString("da-DK", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      });
                      return `${datePart} kl. ${timePart}`;
                    })()
                  }
              </div>
              <div className="vejr_today-temp">{Math.round(today.temps.noon ?? 0)}°</div>
              <div className="vejr_today-desc">
                {weatherDescriptions[today.weathercode] || "Ukendt"}
              </div>
              
            </div>
            <div className="vejr_today-right">
              <p className="vejr_today-icon">{weatherIcons[today.weathercode] || "?"}</p>
              <div className="vejr_today-temp_time">
                <div className="vejr_today-temp_s">
                  <p>Morgen</p>
                  {today.temps.morning !== null
                    ? Math.round(today.temps.morning)
                    : "-"}
                  °
                </div>
                <div className="vejr_today-temp_s">
                  <p>Middag</p>
                  {today.temps.noon !== null ? Math.round(today.temps.noon) : "-"}
                  °
                </div>
                <div className="vejr_today-temp_s">
                  <p>Aften</p>
                  {today.temps.evening !== null
                    ? Math.round(today.temps.evening)
                    : "-"}
                  °
                </div>
                <div className="vejr_today-temp_s">
                  <p>Nat</p>
                  {today.temps.night !== null
                    ? Math.round(today.temps.night)
                    : "-"}
                  °
                </div>
              </div>
            </div>
          </div>

          <div className="vejr_today-boxes">
            <div className="vejr_today-box">
              <p>Vind</p>
              <p className="vejr_today-box_data">{today.windspeed}</p>
              <p>m/s</p>
            </div>
            <div className="vejr_today-box">
              <p>Chance for regn</p>
              <p className="vejr_today-box_data">{today.precipitationProb}</p>
              <p>%</p>
            </div>
            <div className="vejr_today-box">
              <p>Luftfugtighed</p>
              <p className="vejr_today-box_data">{Math.round(today.humidity)}</p>
              <p>%</p>
            </div>
            <div className="vejr_today-box">
              <p>UV indeks</p>
              <p className="vejr_today-box_data">{today.uvIndex.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="vejr-right">
          {forecast.map((day) => {
            const d = new Date(day.date);
            const dayName = (d.toLocaleDateString("da-DK", { weekday: "long" }));
            const dayDate = d.toLocaleDateString("da-DK", {
              day: "numeric",
              month: "long",
            });

            return (
              <div className="vejr_day-item" key={day.date}>
                <div className="vejr_day-text">
                  <p className="capitalize">{dayName}</p>
                  <p className="vejr_day-right">{dayDate}</p>
                </div>
                <div className="vejr_day-icon">{weatherIcons[day.weathercode] || "?"}</div>
                <div className="vejr_day-temps">
                  <span>{day.temps.morning !== null ? Math.round(day.temps.morning) : ""}°</span>
                  <span>{day.temps.noon !== null ? Math.round(day.temps.noon) : ""}°</span>
                  <span>{day.temps.evening !== null ? Math.round(day.temps.evening) : ""}°</span>
                  <span>{day.temps.night !== null ? Math.round(day.temps.night) : ""}°</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VejrComponent;