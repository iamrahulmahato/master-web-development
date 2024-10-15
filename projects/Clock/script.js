function updateClock() {
  const timezone = document.getElementById("timezone").value;
  const date = new Date();

  // Use Intl.DateTimeFormat to get the time in the selected timezone
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: timezone,
    hour12: false, // You can set this to true for 12-hour format
  };

  const timeString = new Intl.DateTimeFormat("en-US", options).format(date);

  document.getElementById("clock").textContent = timeString;
}

// Call updateClock every second
updateClock();
setInterval(updateClock, 1000);
