
var plannerData = [];
var currentTime;
var currentDate;

startPlanner();

function startPlanner(){
    updateTime();
    if (JSON.parse(localStorage.getItem("pd-AMF")) == null) {
        plannerData = [
        { time: 9, display: "9AM", activity: "" },
        { time: 10, display: "10AM", activity: "" },
        { time: 11, display: "11AM", activity: "" },
        { time: 12, display: "12PM", activity: "" },
        { time: 13, display: "1PM", activity: "" },
        { time: 14, display: "2PM", activity: "" },
        { time: 15, display: "3PM", activity: "" },
        { time: 16, display: "4PM", activity: "" },
        { time: 17, display: "5PM", activity: "" },
        ]
        localStorage.setItem("pd-AMF", JSON.stringify(plannerData));
    }

    else {
        plannerData = JSON.parse(localStorage.getItem("pd-AMF"))
    }
    renderPlannerData();

}

// Function that updates the time every second


function updateTime() {
    currentTime = moment().format("H");
    currentDate = moment().format("dddd, MMMM Do");
}

// loop for showing all data in browser

$("#currentDay").text(currentDate);

function renderPlannerData() {
    for (let i = 0; i < plannerData.length; i++) {
        var trHTML = $("<tr></tr>");
        var imageSrc = "Assets/save.png"
        trHTML.addClass("row");
        $(".container").append(trHTML);

        var timeDisplay = $("<td>" + plannerData[i].display + "</td>")
        timeDisplay.addClass("hour");

        var activityDisplay = $("<td><textarea id='li" + i + "'>" + plannerData[i].activity + "</textarea></td>")
        activityDisplay.addClass("description");
        // activityDisplay.attr("id", "li"+i)

        var saveDisplay = $("<td><img src=" + imageSrc + "></td>")
        saveDisplay.addClass("saveBtn");
        saveDisplay.data("id", "li" + i)


        if (plannerData[i].time == currentTime) {
            activityDisplay.addClass("present");
        }

        else if (plannerData[i].time > currentTime) {
            activityDisplay.addClass("future");
        }

        else if (plannerData[i].time < currentTime) {
            activityDisplay.addClass("past");
        }

        $(trHTML).append(timeDisplay, activityDisplay, saveDisplay);

    }
}
;

$(".saveBtn").on("click", function () {
    var index = $(this).data("id");
    var indNoLi = index.split("li")[1];
    var newDescValue = $("#" + index).val();
    plannerData[indNoLi].activity = newDescValue;
    localStorage.setItem("pd-AMF", JSON.stringify(plannerData));
    renderPlannerData();

})

