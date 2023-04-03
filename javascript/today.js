window.addEventListener('DOMContentLoaded', renderWelcomeMessage);

/**
 * Render welcomemessage and starts clock
 */
function renderWelcomeMessage() {    
  startClock();
}

/**
* Runs function every second and updates current time and date
*/
function startClock() {
  tickClock();
  setInterval(tickClock, 1000);
}

/**
 * Function that gets the current time and displays it on the site
 */
function tickClock() {
  const today = new Date();
  let monthNr = today.getMonth();
  let weekNr = today.getDay() - 1;
  let year = today.getFullYear();
  let date = today.getDate();
  let theMonthName = months[monthNr]
  let weekdayName = weekdays[weekNr]
  const welcomeTitle = document.querySelector('.welcome-title')

  // If weekNr is -1 give weekday the name of the last place in the array ("söndag")  
  if (weekNr === -1) {
    weekdayName = weekdays[6];
  }

  // Writes out for example, "Måndag 19 december 2022"
  welcomeTitle.innerHTML =  weekdayName + " " + date + " " + theMonthName + " " + year
  const timeSection = document.querySelector('.welcome-time');
  timeSection.innerText = getCurrentTime(today);
}

/**
 * Returns the current time in the format HH:MM.
 * @param {Date} today - The current date.
 * @return {string} The current time in the format HH:MM.
 */
function getCurrentTime(today) {

  let hours = today.getHours();
  let minutes = today.getMinutes();

  // Adds a 0 infront of hour if hour is 0-9
  if (hours < 10) hours = "0" + hours; 
  // Adds a 0 infront of minute if minute is 0-9
  if (minutes < 10) minutes = "0" + minutes; 
  // Returns hours and minutes separated with ":"
  return hours + ":" + minutes;
}