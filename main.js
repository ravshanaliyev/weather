const selectCity = document.getElementById("select-city");
const cityName = document.querySelector(".location p");
const temp = document.querySelector(".temp h1");
const description = document.querySelector(".description ");
const feels = document.querySelector(".feels p");
const humidity = document.querySelector(".humidity p");
const wind = document.querySelector(".wind p");
const future = document.querySelector(".future");

const API_KEY = "895284fb2d2c50a520ea537456963d9c";
document.addEventListener("DOMContentLoaded", weatherData);
async function weatherData() {
  const city = selectCity.value;
  const api = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${
      city || "tashkent"
    }&days=7&aqi=yes&alerts=yes`
  );
  const data = await api.json();
  displayData(data);
}
function displayData(data) {
  cityName.innerText = data.location.name;
  temp.innerText = data.current.temp_c + "°C";
  description.innerText = data.current.condition.text;
  feels.innerText = data.current.feelslike_c + "°C";
  humidity.innerText = data.current.humidity + "%";
  wind.innerText = data.current.wind_kph + "Km/h";

  const daysFragment = document.createDocumentFragment();
  data?.forecast?.forecastday.forEach((day) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <h4>${identifyTheWeekDay(+new Date(day.date).getDay()).toUpperCase()}</h4>
    <img src="${day.day.condition.icon}"/>
    <p>${day.day.avgtemp_c}°C</p>
    `;
    daysFragment.appendChild(div);
    future.innerHTML = "";
  });
  future.appendChild(daysFragment);
}

function identifyTheWeekDay(time) {
  switch (time) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
}
