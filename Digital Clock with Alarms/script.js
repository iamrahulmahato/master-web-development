let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
const alarmSound = document.getElementById("alarm-sound");

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const timeString = formatTime(now);
  clock.innerText = timeString;

  checkAlarms(now); // Pass the full Date object for comparison
}

function setAlarm() {
  const alarmTime = document.getElementById("alarm-time").value;
  const alarmNote = document.getElementById("alarm-note").value;
  if (!alarmTime) return showPopup("Please select a time for the alarm!");

  // Convert alarm time to 12-hour format (AM/PM)
  const formattedAlarmTime = convertTo12HourFormat(alarmTime);

  // Check if alarm already exists at the same time
  if (alarms.some((alarm) => alarm.time === formattedAlarmTime)) {
    return showPopup("An alarm is already set at this time!");
  }

  const alarm = {
    time: formattedAlarmTime,
    note: alarmNote || "No note",
    id: Date.now(),
  };

  alarms.push(alarm);
  localStorage.setItem("alarms", JSON.stringify(alarms));
  renderAlarms();
  showPopup("Alarm set successfully!");
}

function checkAlarms(currentTime) {
  const currentTimeString = formatTime(currentTime);

  // Tolerance range: check for 10 seconds buffer
  alarms.forEach((alarm, index) => {
    if (isTimeWithinRange(alarm.time, currentTimeString)) {
      alarmSound.play();
      showPopup(`Alarm ringing! Time: ${alarm.time} - ${alarm.note}`);

      // Automatically delete the alarm after it rings
      alarms.splice(index, 1); // Remove alarm after it rings
      localStorage.setItem("alarms", JSON.stringify(alarms)); // Save to localStorage
      renderAlarms(); // Re-render alarms
    }
  });
}

function isTimeWithinRange(alarmTime, currentTimeString) {
  const alarmTimeParts = alarmTime.split(":");
  const currentTimeParts = currentTimeString.split(":");

  const alarmMinutes = parseInt(alarmTimeParts[1]);
  const currentMinutes = parseInt(currentTimeParts[1]);

  // Allow up to a 10-second difference to trigger the alarm
  return (
    alarmTimeParts[0] === currentTimeParts[0] && // Compare hours
    Math.abs(alarmMinutes - currentMinutes) <= 1 // Allow a 1-minute difference for triggering
  );
}

function renderAlarms() {
  const alarmList = document.getElementById("alarm-list");
  alarmList.innerHTML = ""; // Clear existing alarms

  alarms.forEach((alarm, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${alarm.time} - ${alarm.note}</span>
      <button onclick="deleteAlarm(${index})">Delete</button>
    `;
    alarmList.appendChild(li);
  });
}

function deleteAlarm(index) {
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
  renderAlarms();
}

function showPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  popupMessage.innerText = message;
  popup.style.display = "block";

  // Hide the popup after 2 seconds
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

// Function to format time to 12-hour format (with AM/PM) for display
function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
}

// Convert 24-hour format (HH:mm) to 12-hour format (hh:mm AM/PM)
function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":").map((num) => parseInt(num));
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${period}`;
}

// Initial setup
setInterval(updateClock, 1000);
renderAlarms();
