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
        var longitude = response.coord.longitude
        var latitude = response.coord.latitude
    }

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

