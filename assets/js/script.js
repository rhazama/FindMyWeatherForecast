function initialize() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("searchBtn");
    var dateEl = document.getElementById("date");
    var nameEl = document.getElementById("city-name");
    var picEl = document.getElementById("icon");
    var tempEl = document.getElementById("temp");
    var humidityEl = document.getElementById("humidity");
    var windEl = document.getElementById("wind");
    var uvEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


    var APIKey = "62eabb354d424659c7bbc7f4c19b2dc1";


    function getWeather(cityName) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + APIKey;
        axios.get(queryURL)


        .then(function(response){
            var currentDate = new Date(response.data.dt*1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var year = currentDate.getFullYear();
            dateEl.innerHTML = month + "/" + day + "/" + year;
            nameEl.innerHTML = response.data.name;
            let weatherPic = response.data.weather[0].icon;
                picEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                picEl.setAttribute("alt", response.data.weather[0].description);
                tempEl.innerHTML = "Tempurature: " + response.data.main.temp + "°";
                humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)



            .then(function(response){
                let UVIndex = document.createElement("span");
                UVIndex.setAttribute("class", "badge badge-success");
                UVIndex.innerHTML = response.data[0].value;
                uvEl.innerHTML = "UV Index: ";
                uvEl.append(UVIndex);
            });
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial" + "&appid=" + APIKey;
            axios.get(forecastQueryURL)


            .then(function (response) {
                var forecastEls = document.querySelectorAll(".forecast");
                for (i=0; i<forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    var forecastIndex = i*8 + 4;
                    var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth() + 1;
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);
                    var forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + response.data.list[forecastIndex].main.temp + "°";
                    forecastEls[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);
                }
            })
        });
    }


    searchEl.addEventListener("click", function() {
        var searchTerm = inputEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })



    function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "histoyEl form-control d-block text-light bg-dark");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }


    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }

}
initialize();
