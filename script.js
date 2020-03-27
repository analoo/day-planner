
var plannerData = [];
var currentTime;
var currentDate;

startPlanner();

// function to initiate the planner process

function startPlanner() {
    updateTime();

    $("#currentDay").text(currentDate);
    // time and display values are preset based on class requirements
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
    // page elements are dynamically created based on objects in planner data
    renderPlannerData();
    // time is updated every 30 seconds to ensure highlighting matches current time
    setInterval(updateTime(), 30 * 1000)

}
// function that formats moment to extract time and date
function updateTime() {
    currentTime = moment().format("H");
    currentDate = moment().format("dddd, MMMM Do");
}

function renderPlannerData() {
    // takes planner data and dynamically creates HTML elements
    for (let i = 0; i < plannerData.length; i++) {

        // first a table row is created to how the 3 elements for each hour
        var trHTML = $("<tr></tr>");
        trHTML.addClass("row");
        $(".container").append(trHTML);

        // pulls in display value from planner data
        var timeDisplay = $("<td>" + plannerData[i].display + "</td>")
        timeDisplay.addClass("hour");

        // creates text area and table data elements and assigns a unique id
        var activityDisplay = $("<td><textarea id='li" + i + "'>" + plannerData[i].activity + "</textarea></td>")
        activityDisplay.addClass("description");
        
        // appends image to save display, adds a data elemtn called id that matches the id in the table display
        var imageSrc = "Assets/save.png"
        var saveDisplay = $("<td><img src=" + imageSrc + "></td>")
        saveDisplay.addClass("saveBtn");
        saveDisplay.data("id", "li" + i);

        // assigns click listener to all save display buttons
        saveDisplay.on("click", saveActivity);

        // for each element, checks value relative to time and adds appropriate class for formatting
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

// $(document.body).on('click', '.saveBtn' , clickEvent);

// click event that triggers saving data to local storage
function saveActivity() {
    // pulls data id value from save button
    var dataID = $(this).data("id");
    // turns value into integer value, matching to desired index
    var index = dataID.split("li")[1];
    // extracts the value of the activity description
    var newDescValue = $("#" + dataID).val();
    // and assigns it back to the planner data
    plannerData[index].activity = newDescValue;
    // this is then stored locally
    localStorage.setItem("pd-AMF", JSON.stringify(plannerData));
    // the rendered HTML is cleared
    $(".container").empty();
    // and the renderPlannerData function is reran
    renderPlannerData();

}