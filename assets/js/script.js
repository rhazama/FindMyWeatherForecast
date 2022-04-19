//var APIKey = "";
var buttonDiv = $("button-div");
var cityBtnArr = [];

loadData();

function reloadData() {
    $("#city-title").empty();
    $("#tempurature").empty();
    $("#wind-speed").empty();
};

function clearForecastBoxes() {
    for (i = 1; i < 6; i++) {
        $("#date" + i).empty();
    };
};

$("form").on('submit', function (e) {
    e.preventDefault();
    var city = ""
    city = $("#city-input").val()
    var queryURL = ``
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function (response) {
        var longitude = response.coord.lon
        var latitude = response.coord.lat

        $("#UV-index").empty();
        var uvURL = ''
        $.ajax({
            url:uvURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $("#UV-index").text("UV Index: " + response.value)
            if(response.value > 7){
            $("UV-index").removeClass()
            $("UV-index").addClass("badge badger-danger")
            }
            if(response.value < 3) {
            $("UV-index").removeClass()
            $("UV-index").addClass("badge badger-success")            
            }
            if(response.value > 3 && response.value < 7) {
            $("UV-index").removeClass()
            $("UV-index").addClass("badge badger-warning")            
            }
        });

        var icon = '';

        $('#icon').html(`<img src="${icon}">`);
        $('#icon').attr("class", "icon")
        $("#city-title").empty()
        $("#city-title").append(response.name)
        $(".city").attr("style", "font-weight: bold; font-size: 30px")
        $("#wind-speed").append("Wind speed: " + response.wind.speed + " MPH")
        var convert = response.main.temp
        var F = (conver - 273.15) * 1.80 + 32
        F = F.toFixed(0)
        $("#tempurature").empty()
        $("#tempurature").append("Tempurature: " + F + "°")

        forecastData();

        function forecastData() {
            var forecastUrl = ``
            $.ajax({
                url: forecastUrl,
                method: "GET"
            }).then(function (response) {
            console.log("forecast response")
            console.log(response)

            clearForcastBoxes();

        $("#date1").append(response.list[7].dt_txt.slice(5, 10))
        $('#date1').append("<br>")
        var icon = ``
        $('#date1').append(`<img src="${icon}">`);
        $('#date1').attr("style", "font-size: 10px; text-align: center;")
        $('#date1').append("Tempurature: " + response.list[7].main.temp.toFixed(0) + "°")
        $('#date1').append("<br>")
        $('#date1').append("Humidity: " + response.list[7].main.humidity + "%")

        $("#date2").append(response.list[15].dt_txt.slice(5, 10))
        $('#date2').append("<br>")
        var icon = ``
        $('#date2').append(`<img src="${icon}">`);
        $('#date2').attr("style", "font-size: 10px; text-align: center;")
        $('#date2').append("Tempurature: " + response.list[15].main.temp.toFixed(0) + "°")
        $('#date2').append("<br>")
        $('#date2').append("Humidity: " + response.list[15].main.humidity + "%")

        $("#date3").append(response.list[23].dt_txt.slice(5, 10))
        $('#date3').append("<br>")
        var icon = ``
        $('#date3').append(`<img src="${icon}">`);
        $('#date3').attr("style", "font-size: 10px; text-align: center;")
        $('#date3').append("Tempurature: " + response.list[23].main.temp.toFixed(0) + "°")
        $('#date3').append("<br>")
        $('#date3').append("Humidity: " + response.list[23].main.humidity + "%")

        $("#date4").append(response.list[31].dt_txt.slice(5, 10))
        $('#date4').append("<br>")
        var icon = ``
        $('#date4').append(`<img src="${icon}">`);
        $('#date4').attr("style", "font-size: 10px; text-align: center;")
        $('#date4').append("Tempurature: " + response.list[31].main.temp.toFixed(0) + "°")
        $('#date4').append("<br>")
        $('#date4').append("Humidity: " + response.list[31].main.humidity + "%")

        $("#date5").append(response.list[39].dt_txt.slice(5, 10))
        $('#date5').append("<br>")
        var icon = ``
        $('#date5').append(`<img src="${icon}">`);
        $('#date5').attr("style", "font-size: 10px; text-align: center;")
        $('#date5').append("Tempurature: " + response.list[39].main.temp.toFixed(0) + "°")
        $('#date5').append("<br>")
        $('#date5').append("Humidity: " + response.list[39].main.humidity + "%")
    })
}

generateButton();
clearForm();

function loadData() {
    var loadData = localStorage.getItem("cityStorage");
    if (loadData == null || loadData == "") {
        return;
    }
    cityButtonArr = JSON.parse(loadData)
    for (i = 0; i < cityButtonArr.length; i++) {
        var create = $("<button>")
        create.text(cityButtonArr[i])
        buttonDic.prepend(create)
    };
};

