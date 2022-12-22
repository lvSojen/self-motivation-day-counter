var dt = new Date();
var full_year = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();

// Initialize local storage here
if (!localStorage.getItem("number")) {
  localStorage.setItem("number", 0);
}

// full year in format
var text = document.getElementById("day-time");
text.innerHTML = full_year;

var count_day = document.getElementById("count-day");
count_day.innerHTML = localStorage.number;
if (isNaN(count_day.innerHTML)) {
  count_day.innerHTML = 0;
}

//getElementById
var increaseButton = document.getElementById("increase-button");
var decreaseButton = document.getElementById("decrease-button");
var resetButton = document.getElementById("reset-button");
var dayValue = document.getElementById("day-value");
var monthValue = document.getElementById("month-value");
var yearValue = document.getElementById("year-value");
var contentText = document.getElementById("current-goal");

if (localStorage.getItem("message")) {
  contentText.innerHTML = localStorage.message;
}
// initialized
dayValue.innerHTML = 0;
monthValue.innerHTML = 0;
yearValue.innerHTML = 0;

//updateButton's status instantly
function updateButton() {
  current_number = parseInt(count_day.innerHTML);
  if (current_number <= 0) {
    decreaseButton.disabled = true;
  } else {
    decreaseButton.disabled = false;
  }
  current_number = parseInt(count_day.innerHTML);
  if (current_number < 30) {
    dayValue.innerHTML = current_number;
  } else if (current_number >= 30) {
    dayValue.innerHTML = parseInt(
      (current_number - yearValue.innerHTML * 365) % 31
    );
    monthValue.innerHTML = parseInt(
      (current_number - yearValue.innerHTML * 365) / 31
    );
    yearValue.innerHTML =
      current_number >= 365 ? parseInt(current_number / 365) : 0;
  }
  //1 or other days
  var grammarCheck = document.getElementById("days");
  if (parseInt(count_day.innerHTML) === 1) {
    grammarCheck.innerHTML = "day";
  } else {
    grammarCheck.innerHTML = "days";
  }
}
setInterval(updateButton, 0);

//increaseButton
increaseButton.addEventListener("click", function () {
  update = parseInt(count_day.innerHTML) + 1;
  localStorage.setItem("number", update);
  count_day.innerHTML = update;
});

//hold on left-click for speedy increament
increaseButton.addEventListener("mousedown", () => {
  let intervalId = null;
  // Start the interval when the button is held down
  intervalId = setInterval(() => {
    update = parseInt(count_day.innerHTML) + 1;
    localStorage.setItem("number", update);
    count_day.innerHTML = update;
  }, 100); // Increment the counter every 100 milliseconds
  increaseButton.addEventListener("mouseup", () => {
    // Clear the interval when the button is released
    clearInterval(intervalId);
  });
});

//decreaseButton
decreaseButton.addEventListener("click", function () {
  update = parseInt(count_day.innerHTML) - 1;
  localStorage.setItem("number", update);
  count_day.innerHTML = update;
});

//hold on left-click for speedy decrement
decreaseButton.addEventListener("mousedown", () => {
  let intervalId = null;
  // Start the interval when the button is held down
  intervalId = setInterval(() => {
    update = parseInt(count_day.innerHTML) - 1;
    if (update < 0) {
      clearInterval(intervalId);
      return;
    }
    localStorage.setItem("number", update);
    count_day.innerHTML = update;
  }, 100); // Increment the counter every 100 milliseconds
  decreaseButton.addEventListener("mouseup", () => {
    // Clear the interval when the button is released
    clearInterval(intervalId);
  });
});

//resetButton
resetButton.addEventListener("click", function () {
  localStorage.setItem("number", 0);
  count_day.innerHTML = 0;
  dayValue.innerHTML = 0;
  monthValue.innerHTML = 0;
  yearValue.innerHTML = 0;
});

//hide edit-form
function showEditForm() {
  // Get the element to hide
  var dateForm = document.getElementById("date-form");
  var editForm = document.getElementById("edit-form");
  var textArea = document.getElementById("edit-goal");

  // Toggle the element's visibility
  if (editForm.style.display === "block") {
    editForm.style.display = "none";
  } else {
    dateForm.style.display = "none";
    editForm.style.display = "block";
  }
  textArea.focus();
}

//update new Goal when submit using edit task form
var taskForm = document.getElementById("edit-form");

taskForm.addEventListener("submit", function (event) {
  var editForm = document.getElementById("edit-goal");
  var currentGoal = document.getElementById("current-goal");
  if (!editForm.value.trim()) {
    alert("Please enter some text in the textarea");
  } else {
    currentGoal.innerHTML = editForm.value.trim();
    localStorage.setItem("message", editForm.value);
    editForm.value = "";
    showEditForm();
  }

  event.preventDefault();
});

//hide date-form
function showDateForm() {
  // Get the element to hide
  // var editForm = document.getElementById("edit-form");
  var dateForm = document.getElementById("date-form");
  var editForm = document.getElementById("edit-form");
  var textArea = document.getElementById("edit-number");

  // Toggle the element's visibility
  if (dateForm.style.display === "block") {
    dateForm.style.display = "none";
  } else {
    editForm.style.display = "none";
    dateForm.style.display = "block";
  }
  textArea.focus();
}

//update new Goal when submit using edit task form
var dateForm = document.getElementById("date-form");
dateForm.addEventListener("submit", function (event) {
  var editForm = document.getElementById("edit-number");
  var currentNumber = document.getElementById("count-day");
  trimNumber = parseInt(editForm.value.trim());
  if (!editForm.value || editForm.value.trim() === "") {
    alert("Please enter some text in the textarea");
  } else if (!Number.isInteger(trimNumber)) {
    alert("Please enter integer number in the textarea");
  } else {
    currentNumber.innerHTML = trimNumber;
    localStorage.setItem("number", trimNumber);
    editForm.value = "";
    showDateForm();
  }

  event.preventDefault();
});
// //send mission
// function sendMission() {
//   var editForm = document.getElementById("edit-goal").value;
//   var currentGoal = document.getElementById("current-goal");

//   currentGoal.innerText = editForm;
// }

// function clearForm() {
//   // Get the form element
//   var form = document.getElementById("edit-form");

//   // Reset the form
//   // form.reset();
//   // showEditForm();
// }
