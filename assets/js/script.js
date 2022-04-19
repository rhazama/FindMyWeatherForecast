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

        //date css work
    }
};

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

