
var plannerData = [
   {time: 9, display: "9AM", activity: "String of text for nine"},
   {time: 10, display: "10AM", activity: "String of text for ten"},
   {time: 11, display: "11AM", activity: "String of text for eleven"},
   {time: 12, display: "12PM", activity: "String of text for twelve"},
   {time: 13, display: "1PM", activity: "String of text for one"},
   {time: 14, display: "2PM", activity: "String of text for two"},
   {time: 15, display: "3PM", activity: "String of text for three"},
   {time: 16, display: "4PM", activity: "String of text for four"},
   {time: 17, display: "5PM", activity: "String of text for five"},
]

// Function that updates the time every second
var currentTime;
var currentDate;

function updateTime() {
    currentTime = moment().format("H");
    currentDate = moment().format("dddd, MMMM Do");
}

updateTime();

// loop for showing all data in browser

for (let i = 0; i< plannerData.length ; i++){
    var trHTML = $("<tr></tr>");
    trHTML.addClass("row");
    $(".container").append(trHTML);
    var timeDisplay = $("<td>"+plannerData[i].display +"</td>")
    var activityDisplay = $("<td><textarea>"+plannerData[i].activity +"</textarea></td>")
    var saveDisplay = $("<td> O </td>")
    timeDisplay.addClass("hour");
    activityDisplay.addClass("description");
    saveDisplay.addClass("saveBtn");

    if(plannerData[i].time == currentTime){
        activityDisplay.addClass("present");
    }

    else if(plannerData[i].time > currentTime){
        activityDisplay.addClass("future");
    }

    else if(plannerData[i].time < currentTime){
        activityDisplay.addClass("past");
    }



    $(trHTML).append(timeDisplay, activityDisplay, saveDisplay);

}



;

