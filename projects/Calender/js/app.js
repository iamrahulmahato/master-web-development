const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentWeekDay = currentDate.getDay();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

let month = document.querySelector(".month");
let year = document.querySelector(".year");
let day = document.querySelector(".day");
let date = document.querySelector(".date");
let today = document.querySelector(".today1");

const months = [
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

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let userYear = currentYear;
let userMonth = currentMonth;

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const numOfDays = (monthIndex) => {
  if (monthIndex === 1) return isLeapYear(userYear) ? 29 : 28; // February
  return [0, 2, 4, 6, 7, 9, 11].includes(monthIndex) ? 31 : 30; // Other months
};

const updateCalendar = (monthIndex) => {
  let daysContainer = document.querySelector(".days ul");
  let daysHTML = "";
  const firstDayOfMonth = new Date(userYear, monthIndex, 1).getDay();

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysHTML += `<li class="diff"></li>`;
  }

  for (let day = 1; day <= numOfDays(monthIndex); day++) {
    daysHTML += `<li class="${
      day === currentDay &&
      monthIndex === currentMonth &&
      userYear === currentYear
        ? "today"
        : ""
    }">${day}</li>`;
  }

  daysContainer.innerHTML = daysHTML;
};

const main = () => {
  year.innerText = currentYear;
  month.innerText = months[currentMonth];
  day.innerText = weekDays[currentWeekDay];
  date.innerText = currentDay;
  today.innerText = currentDate.toDateString();
  updateCalendar(currentMonth);
};
main();

let monthDownBtn = document.querySelector(".month-down");
let yearDownBtn = document.querySelector(".year-down");
let monthList = document.querySelector(".month-list");
let yearList = document.querySelector(".year-list");
let leftBtn = document.querySelector(".left-ico");
let rightBtn = document.querySelector(".right-ico");

const removeMonthYearCurr = (monthIndex = userMonth, year = userYear) => {
  document.querySelector(`.M${monthIndex}`)?.classList.remove("curr");
  document.querySelector(`.Y${year}`)?.classList.remove("curr");
};

const addMonthYearCurr = (monthIndex = userMonth, year = userYear) => {
  document.querySelector(`.M${monthIndex}`)?.classList.add("curr");
  document.querySelector(`.Y${year}`)?.classList.add("curr");
};

const setYear = () => {
  year.innerText = userYear;
};

const setMonth = (monthIndex) => {
  month.innerText = months[monthIndex];
};

yearList.addEventListener("click", (e) => {
  removeMonthYearCurr();
  userYear = parseInt(e.target.innerText);
  setYear();
  addMonthYearCurr(userMonth, userYear);
  updateCalendar(userMonth);
});

monthList.addEventListener("click", (e) => {
  const newMonthIndex = months.indexOf(e.target.innerText);
  removeMonthYearCurr(userMonth);
  userMonth = newMonthIndex;
  setMonth(userMonth);
  addMonthYearCurr(userMonth);
  updateCalendar(userMonth);
});

(() => {
  monthList.innerHTML = months
    .map((m, i) => `<li class="M${i}">${m}</li>`)
    .join("");
  yearList.innerHTML = Array.from(
    { length: 11 },
    (_, i) => `<li class="Y${currentYear + i}">${currentYear + i}</li>`
  ).join("");
  addMonthYearCurr();
})();

leftBtn.addEventListener("click", () => {
  removeMonthYearCurr(userMonth);
  userMonth--;
  if (userMonth < 0) {
    userMonth = 11;
    userYear--;
  }
  addMonthYearCurr(userMonth, userYear);
  setMonth(userMonth);
  setYear();
  updateCalendar(userMonth);
});

rightBtn.addEventListener("click", () => {
  removeMonthYearCurr(userMonth);
  userMonth++;
  if (userMonth > 11) {
    userMonth = 0;
    userYear++;
  }
  addMonthYearCurr(userMonth, userYear);
  setMonth(userMonth);
  setYear();
  updateCalendar(userMonth);
});

const toggleVisibility = (element, isOpen) => {
  if (isOpen) {
    element.classList.add("visible");
  } else {
    element.classList.remove("visible");
  }
};

monthDownBtn.addEventListener("click", () => {
  const isOpen = monthList.classList.contains("visible");
  toggleVisibility(monthList, !isOpen);
});

yearDownBtn.addEventListener("click", () => {
  const isOpen = yearList.classList.contains("visible");
  toggleVisibility(yearList, !isOpen);
});
