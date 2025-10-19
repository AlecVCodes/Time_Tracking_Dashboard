let json;

//tracking options

const dailyTrackingBtn = document.querySelector(".daily-option");
const weeklyTrackingBtn = document.querySelector(".weekly-option");
const monthlyTrackingBtn = document.querySelector(".monthly-option");

let trackingOptions = [dailyTrackingBtn, weeklyTrackingBtn, monthlyTrackingBtn];
// get stat values from HTML

let currentHours = document.querySelectorAll(".current-time-spent");
let previousHours = document.querySelectorAll(".previous-time-spent");

console.log(currentHours, "current hours");
console.log(previousHours, "Previous hours");
fetch("data.json")
  .then((response) => {
    if (!response.ok) return console.log("Error");

    return response.json();
  })
  .then((data) => {
    // assign data to json variable

    json = data;

    dailyTrackingBtn.addEventListener("click", (e) => {
      //set as active state
      activeOption(dailyTrackingBtn);

      let dailyOptions = json.map(({ timeframes }) => timeframes.daily);
      console.log(dailyOptions, "dailyOptions");
      passData(dailyOptions);
    });

    weeklyTrackingBtn.addEventListener("click", (e) => {
      //set as active state
      activeOption(weeklyTrackingBtn);

      let weeklyOptions = json.map(({ timeframes }) => timeframes.weekly);
      passData(weeklyOptions);
    });

    monthlyTrackingBtn.addEventListener("click", (e) => {
      //set as active state
      activeOption(monthlyTrackingBtn);

      let monthlyOptions = json.map(({ timeframes }) => timeframes.monthly);
      passData(monthlyOptions);
    });
  });

// change active option

function activeOption(trackingOption) {
  //remove class from whatever option has the active state
  trackingOptions.forEach((option) => {
    option.classList.remove("active");
  });

  trackingOption.classList.add("active");
}

//pass through the data and add it to UI
function passData(options) {
  console.log(options, "Options");

  // get the current values from each object and create new array with that data
  const currentValues = options.map((obj) => obj.current);
  // get the previous values from each object and create new array with that data
  const previousValues = options.map((obj) => obj.previous);

  console.log(currentValues, "current values");
  console.log(previousValues, "previous values");

  //assign values to ui
  currentHours.forEach((currentHour, index) => {
    currentHour.innerText = `${currentValues[index]}hrs`;
  });

  previousHours.forEach((previousHour, index) => {
    previousHour.innerText = `Last Week - ${previousValues[index]}hrs`;
  });
}
