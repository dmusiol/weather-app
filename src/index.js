let now = new Date();

let date = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentYear = now.getFullYear();

let dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let today = dayList[now.getDay()];

let monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = monthsList[now.getMonth()];

let currentDate = document.querySelector("#datetime");
currentDate.innerHTML = `${today}, ${currentMonth} ${date}, ${currentYear}, ${hours}:${minutes}`;

/* SEARCH ENGINE */

function displayWeather(response) {
  let currentTemp = document.querySelector("h2");
  let weather = document.querySelector("#todayWeather");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#wind");
  let windConvert = Math.round(response.data.wind.speed * 3.6);
  let city = document.querySelector("h1");

  celsiusTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${celsiusTemp}°`;
  weather.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${windConvert}`;
  city.innerHTML = response.data.name;
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-engine");
  let city = document.querySelector("h1");
  let currentCity = `${searchInput.value}`;
  city.innerHTML = currentCity;

  let apiKey = `34c58b2c4ee93547facc769d027d3250`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`;

  axios.get(url).then(displayWeather);
}

let searchResult = document.querySelector("#search-form");
searchResult.addEventListener("submit", displayCity);

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
  let currentTemp = document.querySelector("h2");
  celsius.classList.add("active");
  fahrenheits.classList.remove("active");
  currentTemp.innerHTML = `${celsiusTemp}°`;
}

let celsiusTemp = null;

let fahrenheits = document.querySelector("#fahr");
fahrenheits.addEventListener("click", displayFahrenheitTemp);

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", displayCelsiusTemp);
