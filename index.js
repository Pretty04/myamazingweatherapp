function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    let iconElement = document.querySelector("#icon")

    descriptionElement.innerHTML = response.data.condition.description
    humidityElement.innerHTML =`${response.data.temperature.humidity}%`
    windElement.innerHTML = `${response.data.wind.speed}km/h`
    iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" class="current-temperature-icon"/>`
    getForecastData(response.data.city)

  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
  
    let apiKey = "ea3c4t6b1of3930c725593e0b86c4cc3";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayTemperature);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[date.getDay()];
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
function getForecastData(city){
let apiKey = "ea3c4t6b1of3930c725593e0b86c4cc3";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
axios(apiUrl).then(displayForecast)
}
function displayForecast(response) {
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  search("Paris");
  displayForecast();
