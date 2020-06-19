// DATE FUNCTIONS //

function formatDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tueseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minutes = now.getMinutes();

  function displayMinutes() {
    if (minutes < 10) {
      return `0${minutes}`;
    } else {
      return `${minutes}`;
    }
  }
  let formatMinutes = displayMinutes();

  let today = `${day}, ${month} ${date}, ${hour}:${formatMinutes}`;
  return `${today}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

// TODAY WEATHER //

function displayWeather(response) {
  let currentTemp = document.querySelector("h2");
  let weather = document.querySelector("#todayWeather");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let windConvert = Math.round(response.data.wind.speed * 3.6);
  let city = document.querySelector("h1");
  let currentDate = document.querySelector("#datetime");

  celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celsiusTemp}°`;
  weather.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${windConvert}`;
  city.innerHTML = response.data.name;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

// FORECAST //

function formatDay(timestamp) {
  let date = new Date(timestamp);
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let day = days[date.getDay()];
  return `${day}`;
}

function displayForecast(response) {
  let forecatsItem = document.querySelector("#forecast");
  forecatsItem.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecatsItem.innerHTML += `
          <div class="col next-day">
            <h3>${formatHours(forecast.dt * 1000)}</h3>
            <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
            <div class="col temp">
            <span class="high">${Math.round(
              forecast.main.temp_max
            )}</span> | <span class= "low">${Math.round(
      forecast.main.temp_min
    )}</span>
            </div>
          </div>`;
  }
}

// SEARCH CITY //

function search(city) {
  let apiKey = `34c58b2c4ee93547facc769d027d3250`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayForecast);
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-engine");
  search(searchInput.value);
}

/* CURRENT LOCATION */

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `34c58b2c4ee93547facc769d027d3250`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#geo");
locationButton.addEventListener("click", getPosition);

// UNITS CONVERSION //

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("h2");
  // remove active class from cels
  celsius.classList.remove("active");
  fahrenheits.classList.add("active");
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = `${Math.round(fahrTemp)}°`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();

  celsius.classList.add("active");
  fahrenheits.classList.remove("active");
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = `${celsiusTemp}°`;
}

let celsiusTemp = null;

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", displayCity);

let fahrenheits = document.querySelector("#fahr");
fahrenheits.addEventListener("click", displayFahrenheitTemp);

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", displayCelsiusTemp);

search("Madrid");
