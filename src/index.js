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
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("h2");
  currentTemp.innerHTML = `${temp}°`;

  let weather = document.querySelector("#todayWeather");
  weather.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#hum");
  humidity.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;

  let wind = document.querySelector("#wind");
  let windConvert = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `${windConvert}`;

  let city = document.querySelector("h1");
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
