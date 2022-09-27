function initialize() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("searchBtn");
    var nameEl = document.getElementById("city-name");
    var picEl = document.getElementById("icon");
    var tempEl = document.getElementById("tempurature");
    var windEl = document.getElementById("wind");
    var uvEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    var APIKey = "62eabb354d424659c7bbc7f4c19b2dc1";

    function getWeather(cityName) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&uints=imperial" + "&appid=" + APIKey;
        axios.get(queryURL)

        .then(function(response){
            var currentDate = new Date(response.data.dt*1000);
            var day = currentDate.getDate();
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherPic = response.data.weather[0].icon;
                currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPicEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Tempurature: " + response.data.main.temp ;
                currentHumidityEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
            axios.get(UVQueryURL)

            .then(function(response){
                let UVIndex = document.createElement("span");
                UVIndex.setAttribute("class", "badge badge-success");
                UVIndex.innerHTML = response.data[0].value;
                currentUVEl.innerHTML = "UV Index: ";
                currentUVEl.append(UVIndex);
            });
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial" + "&appid=" + APIKey;
            axios.get(forecastQueryURL)

            .then(function (response) {
                var forecastEls = documents.querySelectorAll(".forecast");
                for (i=0; i<forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    var forecastIndex = i*8 + 4;
                    var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    var forecastDay = forecastDate.getDate();
                    var forecastMonth = forecastDate.getMonth();
                    var forecastYear = forecastDate.getFullYear();
                    var forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);
                    var forecastDateEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://api.openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    var forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + response.data.list[forecastIndex].main.temp;
                    forecastEls[i].append(forecastTempEl);
                    var forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);
                }
            })
        })
    }
}


// loadData();

// function reloadData() {
//     $("#city-title").empty();
//     $("#tempurature").empty();
//     $("#Humidity").empty();
//     $("#wind-speed").empty();
// };

// function clearForecastBoxes() {
//     for (i = 1; i < 6; i++) {
//         $("#date" + i).empty();
//     };
// };

// $("form").on('submit', function (e) {
//     e.preventDefault();
//     var city = ""
//     city = $("#city-input").val()
//     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
//     $.ajax({
//         url:queryURL,
//         method:"GET"
//     }).then(function (response) {
//         var lon = response.coord.lon
//         var lat = response.coord.lat

//         $("#UV-index").empty();
//         var uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`
//         $.ajax({
//             url:uvURL,
//             method: "GET"
//         }).then(function(response) {
//             console.log(response)
//             $("#UV-index").text("UV Index: " + response.value)
//             if(response.value > 7){
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-danger")
//             }
//             if(response.value < 3) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-success")            
//             }
//             if(response.value > 3 && response.value < 7) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-warning")            
//             }
//         });

//         var icon = `http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`

//         $('#icon').html(`<img src="${icon}">`);
//         $('#icon').attr("class", "icon")
//         $("#city-title").empty()
//         $("#city-title").append(response.name)
//         $(".city").attr("style", "font-weight: bold; font-size: 1px")
//         $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
//         var convert = response.main.temp
//         var F = (convert - 273.15) * 1.80 + 32
//         F = F.toFixed(0)
//         $("#tempurature").empty()
//         $("#tempurature").append("Tempurature: " + F + "°")

//         forecastData();

//         function forecastData() {
//             var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}35&lon=${lon}&units=imperial&APPID=${APIKey}`
//             $.ajax({
//                 url: forecastUrl,
//                 method: "GET"
//             }).then(function (response) {
//             console.log("forecast response")
//             console.log(response)

//             clearForcastBoxes();

//             $("#date1").append(response.list[7].dt_txt.slice(5, 10))
//             $('#date1').append("<br>")
//             var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//             $('#date1').append(`<img src="${icon}">`);
//             $('#date1').attr("style", "font-size: 10px; text-align: center;")
//             $('#date1').append("Tempurature: " + response.list[7].main.temp.toFixed(0) + "°")
//             $('#date1').append("<br>")
//             $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

//             $("#date2").append(response.list[15].dt_txt.slice(5, 10))
//             $('#date2').append("<br>")
//             var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//             $('#date2').append(`<img src="${icon}">`);
//             $('#date2').attr("style", "font-size: 10px; text-align: center;")
//             $('#date2').append("Tempurature: " + response.list[15].main.temp.toFixed(0) + "°")
//             $('#date2').append("<br>")
//             $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

//             $("#date3").append(response.list[23].dt_txt.slice(5, 10))
//             $('#date3').append("<br>")
//             var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//             $('#date3').append(`<img src="${icon}">`);
//             $('#date3').attr("style", "font-size: 10px; text-align: center;")
//             $('#date3').append("Tempurature: " + response.list[23].main.temp.toFixed(0) + "°")
//             $('#date3').append("<br>")
//             $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

//             $("#date4").append(response.list[31].dt_txt.slice(5, 10))
//             $('#date4').append("<br>")
//             var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//             $('#date4').append(`<img src="${icon}">`);
//             $('#date4').attr("style", "font-size: 10px; text-align: center;")
//             $('#date4').append("Tempurature: " + response.list[31].main.temp.toFixed(0) + "°")
//             $('#date4').append("<br>")
//             $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

//             $("#date5").append(response.list[39].dt_txt.slice(5, 10))
//             $('#date5').append("<br>")
//             var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//             $('#date5').append(`<img src="${icon}">`);
//             $('#date5').attr("style", "font-size: 10px; text-align: center;")
//             $('#date5').append("Tempurature: " + response.list[39].main.temp.toFixed(0) + "°")
//             $('#date5').append("<br>")
//             $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
//         })
//     }

//     generateButton();
//     clearForm();

//     function generateButton() {
//         var create = $("<button>")
//         create.attr("class", "btn btn-outline-secondary")
//         create.attr("type", "button")
//         create.text(response.name)
//         buttonDiv.prepend(create)
//         var cityString = response.name
//         cityBtnArr.push(cityString.toString())
//         localStorage.setItem("cityStorage", JSON.stringify(cityBtnArr))
//         };
//     })
// });

// function loadData() {
//     var loadData = localStorage.getItem("cityStorage");
//     if (loadData == null || loadData == "") {
//         return;
//     }
//     cityBtnArr = JSON.parse(loadData)
//     for (i = 0; i < cityBtnArr.length; i++) {
//         var create = $("<button>")
//         create.attr("class", "btn btn-outline-secondary")
//         create.text(cityBtnArr[i])
//         buttonDiv.prepend(create)
//     };
// };

// $(".btn").on('click', function () {
//     city = $(this).text()
//     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         reloadData();
//         $("#city-title").append(response.name)
//         $(".city").attr("style", "font-weight: bold; font-size: 31px")
//         $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
//         var convert = response.main.temp
//         var F = (convert - 273.15) * 1.80 + 32
//         F = F.toFixed(0)
//         $("#tempurature").append("Tempurature: " + F + "°")

//         var lon = response.coord.lon
//         var lat = response.coord.lat

//         $("#UV-index").empty()
//         var uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`
//         $.ajax({
//             url: uvURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response)
//             $("#UV-index").text("UV Index: " + response.value)
//             if(response.value > 7){
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-danger")
//             }
//             if(response.value < 3) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-success")            
//             }
//             if(response.value > 3 && response.value < 7) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-warning")            
//             }
//         });

//         forecastData();

//         function forecastData() {
//             var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}35&lon=${lon}&units=imperial&APPID=${APIKey}`
//             $.ajax({
//                 url: forecastUrl,
//                 method: "GET"
//             }).then(function (response) {
//                 console.log("forecast response")
//                 console.log(response)

//                 clearForecastBoxes();

//                 $("#date1").append(response.list[7].dt_txt.slice(5, 10))
//                 $('#date1').append("<br>")
//                 var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//                 $('#date1').append(`<img src="${icon}">`);
//                 $('#date1').attr("style", "font-size: 10px; text-align: center;")
//                 $('#date1').append("Tempurature: " + response.list[7].main.temp.toFixed(0) + "°")
//                 $('#date1').append("<br>")
//                 $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")
    
//                 $("#date2").append(response.list[15].dt_txt.slice(5, 10))
//                 $('#date2').append("<br>")
//                 var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//                 $('#date2').append(`<img src="${icon}">`);
//                 $('#date2').attr("style", "font-size: 10px; text-align: center;")
//                 $('#date2').append("Tempurature: " + response.list[15].main.temp.toFixed(0) + "°")
//                 $('#date2').append("<br>")
//                 $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")
    
//                 $("#date3").append(response.list[23].dt_txt.slice(5, 10))
//                 $('#date3').append("<br>")
//                 var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//                 $('#date3').append(`<img src="${icon}">`);
//                 $('#date3').attr("style", "font-size: 10px; text-align: center;")
//                 $('#date3').append("Tempurature: " + response.list[23].main.temp.toFixed(0) + "°")
//                 $('#date3').append("<br>")
//                 $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")
    
//                 $("#date4").append(response.list[31].dt_txt.slice(5, 10))
//                 $('#date4').append("<br>")
//                 var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//                 $('#date4').append(`<img src="${icon}">`);
//                 $('#date4').attr("style", "font-size: 10px; text-align: center;")
//                 $('#date4').append("Tempurature: " + response.list[31].main.temp.toFixed(0) + "°")
//                 $('#date4').append("<br>")
//                 $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")
    
//                 $("#date5").append(response.list[39].dt_txt.slice(5, 10))
//                 $('#date5').append("<br>")
//                 var icon = `http://openweathermap.org/img/wn/10d@2x.png`
//                 $('#date5').append(`<img src="${icon}">`);
//                 $('#date5').attr("style", "font-size: 10px; text-align: center;")
//                 $('#date5').append("Tempurature: " + response.list[39].main.temp.toFixed(0) + "°")
//                 $('#date5').append("<br>")
//                 $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
//             })
//         }
//             })
// });

// function clearForm() {
//     $("form").trigger('reset');
// }

// function initialize() {
//     var city = ""
//     if(cityBtnArr.length > 0){
//         lastSearched = cityBtnArr.reverse()
//         var city = lastSearched[0]
//     } else {
//         var city = "Rowland"
//     }
//     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         reloadData();
//         console.log(response)
//         var icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

//         $(`#icon`).html(`<img src="${icon}">`);
//         $(`#icon`).attr("class", "icon")

//         $("#city-title").append(response.name)
//         $(".city").attr("style", "font-weight: bold; font-size: 31px")
//         $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
//         var convert = response.main.temp
//         var F = (convert - 273.15) * 1.80 + 32
//         F = F.toFixed(0)
//         $("#tempurature").append("Tempurature: " + F + "°")

//         var lon = response.coord.lon
//         var lat = response.coord.lat

//         $("#UV-index").empty()
//         let uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKey}`
//         $.ajax({
//             url: uvURL,
//             method: "GET"
//         }).then(function (response) {

//             $("#UV-index").text("UV Index: " + response.value)
//             if(response.value > 7){
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-danger")
//             }
//             if(response.value < 3) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-success")            
//             }
//             if(response.value > 3 && response.value < 7) {
//             $("UV-index").removeClass()
//             $("UV-index").addClass("badge badger-warning")            
//             }
//         });

//         forecastData();

//         function forecastData() {
//             var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}35&lon=${lon}&units=imperial&APPID=${APIKey}`
//         $.ajax({
//             url: forecastUrl,
//             method: "GET"
//         }).then(function (response) {
//         console.log("forecast response")
//         console.log(response)

//         // clearForcastBoxes();
//         $(".forecast-div").empty()

//         for(let i = 0; i <response.daily.length-3; i++) {
//             var card = $('<div>').addClass(`forecast-box day${i}`);
//             var date = $(`<h3>`).text(response.daily[i].dt)
//             var icon = $("<img>").attr('src',`http://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}@2x.png`)
//             icon.css("font-size: 10px; text-align: center;")
//             var temp = $(`<p>`).text("Tempurature: " + response.daily[i].temp.max + "°")
//             var humid = $(`<p>`).text("Humidity: " + response.daily[i].humidity + "%")
//             card.append(date, icon, temp, humid)
//             $(".forecast-div").append(card)
//         }
//         });
//     }
//         });
// };

initialize();