// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// let chooseCity = prompt("Type the city:");
// chooseCity = chooseCity.toLocaleLowerCase().trim();

// if (chooseCity === "") {
//   alert("Your input is incorrect");
// }

// let checktown;

// for (let index = 0; index < Object.keys(weather).length; index++) {
//   if (chooseCity === Object.keys(weather)[index]) {
//     checktown = true;
//     break;
//   } else {
//     checktown = false;
//   }
// }
// if (!checktown) {
//   alert(`Sorry, we don't know the weather for this city,
// try going to https://www.google.com/search?q=weather+${chooseCity}`);
// } else {
//   alert(`It is currently ${Math.round(weather[chooseCity].temp)}℃ in ${
//     chooseCity[0].toUpperCase() + chooseCity.slice(1)
//   }
// with a humidity of ${weather[chooseCity].humidity}%`);
// }

let nowDate = new Date();
let todayDate = nowDate.getDate();
let todayMonth = nowDate.getMonth();
let todayDay = nowDate.getDay();
let months = [
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
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentTime").value = `${
    nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
  }:${
    nowDate.getMinutes() < 10
      ? `0${nowDate.getMinutes()}`
      : nowDate.getMinutes()
  }`;
  document.querySelector(
    "p.current-date"
  ).innerHTML = `${days[todayDay]}, ${todayDate} ${months[todayMonth]}`;
});

document.addEventListener("DOMContentLoaded", () => {
  function search(event) {
    event.preventDefault();
    let chosenCity = document.querySelector("#changeCity").value;
    document.querySelector("#currentCity").value = chosenCity;
    let urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&units=metric&appid=${apiKey}`;
    axios.get(urlWeather).then(showWeather);
  }

  let formCity = document.querySelector("#form-city");
  formCity.addEventListener("submit", search);

  let apiKey = "990a7e052ff48457a84b971695128adf";
  let city = document.querySelector("input#currentCity.form-control").innerHTML;

  function showWeather(response) {
    let temperature = Math.floor(response.data.main.temp);
    //let temperatureF = Math.floor(1.8 * temperature + 32);
    let humidity = response.data.main.humidity;
    let wind = response.data.wind.speed;
    let descriptionWeather = response.data.weather[0].description;
    let icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    let temperatureValue = document.querySelector("h2");
    let humidityValue = document.querySelector("#currentHumidity");
    let windValue = document.querySelector("#currentWind");
    let descriptionValue = document.querySelector("#desciptionWeather");
    let imageIcon = document.querySelector("#icon");
    temperatureValue.innerHTML = `${temperature}℃`; //| ${temperatureF}°F`;
    humidityValue.innerHTML = `${humidity}%`;
    windValue.innerHTML = `${wind} meter/sec`;
    descriptionValue.innerHTML = descriptionWeather;
    imageIcon.setAttribute("src", `${icon}`);
    getForecast(response.data.coord);
  }
});

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let buttonValue = document.querySelector("#current-button");
buttonValue.addEventListener("click", current);

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "990a7e052ff48457a84b971695128adf";
  document.querySelector("p#latitude").innerHTML = `Latitude - ${lat.toFixed(
    3
  )}`;
  document.querySelector("p#longitude").innerHTML = `Longitude - ${lon.toFixed(
    3
  )}`;
  let coordinats = `?lat=${lat}&lon=${lon}units=metric&appid=${apiKey}`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather${coordinats}`;
  //in my village it's doesn't work
  console.log(axios.get(weatherUrl).then(showWeather));
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let elementDisplay = document.querySelector(
    "#weather6.weather-forecast.mt-3"
  );
  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  let apiKey = "990a7e052ff48457a84b971695128adf";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img class ="weather-icon" src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" width="25px" alt="Weather icon">
      <div class="weather-forecast-temperature">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temp.max
      )}℃ </span> 
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}℃</span>
      </div>
     </div> `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  elementDisplay.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "990a7e052ff48457a84b971695128adf";
  let apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
