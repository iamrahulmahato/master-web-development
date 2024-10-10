const date = document.getElementById("date");
const day = document.getElementById("day");
const months = document.getElementById("months");
const year = document.getElementById("year");

const today = new Date();
// console.log(today);
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.innerHTML = (today.getDate()<10 ? "0" : "")+today.getDate();
day.innerHTML = weekdays[today.getDay()];
months.innerHTML = monthName[today.getMonth()];
year.innerHTML = today.getFullYear();