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

//for the final project, I will be working on the situation if the month changing

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentTime").value = `${
    nowDate.getHours() < 10 ? `0${nowDate.getHours()}` : nowDate.getHours()
  }:${
    nowDate.getMinutes() < 10
      ? `0${nowDate.getMinutes()}`
      : nowDate.getMinutes()
  }`;
  document.querySelector(
    "#tableID tbody tr:first-child th"
  ).innerHTML = `${days[todayDay]}, ${todayDate} ${months[todayMonth]}`;
  document.querySelector("#tableID tbody tr:nth-child(2) th").innerHTML = `${
    days[todayDay + 1]
  }, ${todayDate + 1} ${months[todayMonth]}`;
  document.querySelector("#tableID tbody tr:nth-child(3) th").innerHTML = `${
    days[todayDay + 2]
  }, ${todayDate + 2} ${months[todayMonth]}`;
  document.querySelector("#tableID tbody tr:nth-child(4) th").innerHTML = `${
    days[todayDay + 3]
  }, ${todayDate + 3} ${months[todayMonth]}`;
  document.querySelector("#tableID tbody tr:nth-child(5) th").innerHTML = `${
    days[todayDay + 4]
  }, ${todayDate + 4} ${months[todayMonth]}`;
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
    let temperature = `${Math.floor(response.data.main.temp)}`;
    let temperatureValue = document.querySelector("h2");
    temperatureValue.innerHTML = `${temperature}℃`;
  }
});

let buttonValue = document.querySelector("#current-button");
buttonValue.addEventListener("click", current);

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca59042cd269412257c489aa9eea142b";
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

//for final project

// document.addEventListener("DOMContentLoaded", () => {
//   function favorites(event) {
//     event.preventDefault();
//     let chosenCityArray = [];
//     chosenCityArray.push(document.querySelector("#first-town a").innerHTML);
//     chosenCityArray.push(document.querySelector("#second-town a").innerHTML);
//     chosenCityArray.push(document.querySelector("#third-town a").innerHTML);
//     alert(chosenCityArray);
//     document.querySelector("#changeCity").value = chosenCityArray;
//   }
//   let firstCity = document.querySelector("#first-town");
//   firstCity.addEventListener("click", favorites);

//   let secondCity = document.querySelector("#second-town");
//   secondCity.addEventListener("click", favorites);

//   let thirdCity = document.querySelector("#third-town");
//   secondCity.addEventListener("click", favorites);
// });
