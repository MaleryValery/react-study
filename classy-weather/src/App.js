import React, { Component } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"]
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short"
  }).format(new Date(dateStr));
}

class App extends Component {
  state = {
    isLoading: false,
    location: "Tel Aviv",
    displayLocation: "",
    weathe: {}
  };

  fetchWeather = async () => {
    if (this.state.location.length < 3) return this.setState({ weather: {} });
    try {
      this.setState({ isLoading: true });
      // 1) Getting location (geocoding)
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);
      const geoData = await geoRes.json();

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);
      this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}` });

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlerChange = (e) => {
    this.setState({ location: e.target.value });
  };

  handlerClick = () => {
    console.log("loading data...");
    console.log(this);
    this.fetchWeather();
  };

  componentDidMount() {
    this.setState({ location: localStorage.getItem("location") || "Tel Aviv" });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();

      localStorage.setItem("location", this.state.location);
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input onHandlerChange={this.handlerChange} location={this.state.location} />
        <button onClick={this.handlerClick}>get weather</button>
        {this.state.isLoading && <p className="loading">Loading...</p>}
        {this.state?.weather?.weathercode && <Weather weather={this.state?.weather} location={this.state.displayLocation} />}
      </div>
    );
  }
}

class Input extends Component {
  render() {
    return (
      <div>
        <input placeholder="search for location.." type="text" value={this.props.location} onChange={this.props.onHandlerChange} />
      </div>
    );
  }
}

class Weather extends Component {
  componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    const { temperature_2m_max: max, temperature_2m_min: min, weathercode: codes, time: dates } = this.props.weather;
    return (
      <>
        <h2>weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day date={date} max={max.at(i)} min={min.at(i)} code={codes.at(i)} key={date} isToday={i === 0} />
          ))}
        </ul>
      </>
    );
  }
}

class Day extends Component {
  render() {
    const { date, min, max, code, isToday } = this.props;
    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? "Today" : formatDay(date)}</p>
        <p>
          {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;{" "}
        </p>
      </li>
    );
  }
}

export default App;
