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
