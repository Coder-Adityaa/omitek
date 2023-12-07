"use strict";

// Get time in proper way
function formattedDateTime(currentDateTime) {
  // Get day, month, and year
  var day = new Date(currentDateTime).getDate();
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var monthIndex = new Date(currentDateTime).getMonth();
  var year = new Date(currentDateTime).getFullYear(); // Get hours and minutes

  var hours = new Date(currentDateTime).getHours();
  var minutes = new Date(currentDateTime).getMinutes(); // Format the date and time

  var formattedDateTime = "".concat(day, " ").concat(monthNames[monthIndex], " ").concat(year, ", ").concat(hours, ":").concat(minutes);
  return formattedDateTime;
}

console.log(formattedDateTime(Date.now()));