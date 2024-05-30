import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Info() {
  return (
    <div>
      <h1>Info</h1>
      <p>Welcome to the Info page!</p>
      <UserData />
      {/* <WeatherData /> */}
      {/* <NewsData /> */}
      <NotePad />
      <Timer />
    </div>
  );
}

const Timer = () => {
  const [isPlaying, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  function increaseSecond() {
    setTime((time) => time + 1);
  }
  function increaseMinute() {
    setTime((time) => time + 60);
  }
  function increaseHour() {
    setTime((time) => time + 3600);
  }
  function decreaseSecond() {
    if (time > 0) {
      setTime((time) => time - 1);
    }
  }
  function decreaseMinute() {
    if (time >= 60) {
      setTime((time) => time - 60);
    }
  }
  function decreaseHour() {
    if (time >= 3600) {
      setTime((time) => time - 3600);
    }
  }
  function formatTime(time) {
    const hours = parseInt(time / 3600, 10); // time = 7261%3600=61, hours=2
    const minutes = parseInt((time - hours * 3600) / 60, 10); //
    const seconds = parseInt(time - hours * 3600 - minutes * 60, 10);
    return (
      <p>
        {hours}:{minutes}:{seconds}
      </p>
    );
  }
  return (
    <>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={time}
        colors={["#004777"]}
      >
        {({ remainingTime }) => formatTime(remainingTime)}
      </CountdownCircleTimer>
      <button onClick={increaseSecond}>+1 Second</button>
      <button onClick={decreaseSecond}>-1 Second</button>
      <button onClick={increaseMinute}>+1 Minute</button>
      <button onClick={decreaseMinute}>-1 Minute</button>
      <button onClick={increaseHour}>+1 Hour</button>
      <button onClick={decreaseHour}>-1 Hour</button>
      <button disabled={isPlaying} onClick={() => setPlaying(true)}>
        Start
      </button>
    </>
  );
};

const UserData = () => {
  const userDetails = JSON.parse(localStorage.getItem("userData"));
  const movies = JSON.parse(localStorage.getItem("selectedMovie"));

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h1>User Data</h1>
      <p>{userDetails.name}</p>
      <p>{userDetails.email}</p>
      <p>{userDetails.phone}</p>
      <p>
        {movies.map((movie, idx) => (
          <p key={idx}>{movie}</p>
        ))}
      </p>
    </div>
  );
};

const WeatherData = () => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      const url =
        "https://yahoo-weather5.p.rapidapi.com/weather?location=mumbai&format=json&u=f";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2203f925d2mshc4d829150064a10p1e34f7jsn0510d0d703b8",
          "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setWeather(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeather();
  }, []);
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = dd + "/" + mm + "/" + yyyy;
  const formattedTime = hours + ":" + minutes + ":" + seconds;
  return weather ? (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <h1>Weather Data</h1>
      <p>{formattedToday}</p>
      <p>{formattedTime}</p>
      <p>Wind Speed :{weather.current_observation.wind.speed}</p>
      <p>Humidity :{weather.current_observation.atmosphere.humidity}</p>
      <p>Pressure :{weather.current_observation.atmosphere.pressure}</p>
      <p>Temperature :{weather.current_observation.condition.temperature}</p>
    </div>
  ) : null;
};

const NewsData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchNews = async () => {
      const url = "https://google-news13.p.rapidapi.com/latest?lr=en-US";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "2203f925d2mshc4d829150064a10p1e34f7jsn0510d0d703b8",
          "X-RapidAPI-Host": "google-news13.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
  }, []);

  return data ? (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      <p>{data.items[0].title}</p>
      <p>{data.items[0].snippet}</p>
      <img src={data.items[0].images.thumbnail} width={100} height={100} />
    </div>
  ) : null;
};

const NotePad = () => {
  const [data, setData] = useState(localStorage.getItem("notes") ?? "");
  return (
    <textarea
      style={{
        minHeight: "300px",
        maxHeight: "300px",
        background: "#F1C75B",
      }}
      value={data}
      onChange={(e) => {
        localStorage.setItem("notes", e.target.value);
        setData(e.target.value);
      }}
    ></textarea>
  );
};
