/**
@const {array} months
* An array of strings representing the names of the months in Swedish.
*/
const months = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
/**

@const {array} weekdays
* An array of strings representing the names of the weekdays in Swedish.
*/
const weekdays = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag', 'söndag']

/**
Global variables for the current date, month, and year
@constant {Date} d - Current date
@global {number} monthNr - Current month number
@global {number} year - Current year
*/
const d = new Date();
let monthNr = d.getMonth();
let year = d.getFullYear();

/**
 * Shows the todos in the calendar for a given month and year.
 * @param {number} monthNr - The month number to show the todos (0-based).
 * @param {number} year - The year to show the todos for.
 */
function showTodosInCalendar(monthNr, year) {
    
    getFromLocalStorage();
    
    // Get all day-elements in days = []
    const days = [...document.getElementsByClassName('day')];
    
    // Loop all todos and get the date from each todo
    // Loop every day in choosen month and conect to a date
    for (i = 0; i < days.length; i++) {
        const day = i + 1;
        let dayValue = (year + "-" + (monthNr + 1) + "-" + day)
        
        // Change formatting to match todoDate
        let formattedDateString = setFormat(dayValue);

        // For each todo object in the todos array
        for (todo = 0; todo < todos.length; todo++) {

            // Filter the todos array to only include todos with a matching date
            const filter = todos.filter(element => { return element.date == formattedDateString });
            // Get the number of todos with a matching date
            const nrOfTodos = filter.length;
            // Call the createTodoReminder function to add a todo reminder to the day on the calendar
            createTodoReminder(days[i], nrOfTodos)
        }
    }
}

/**
 * Renders the calendar for a given month and year.
 * @returns {Promise} - A promise that resolves when the calendar has been rendered.
 */
async function renderCalander() {

    const calendarBody = document.querySelector('.calendar-content');
    calendarBody.innerHTML = "";

    const monthAndYear = document.querySelector('.month-and-year-title')
    monthAndYear.innerHTML = months[monthNr] + " " + year

    // Gets the first weekday of the current month
    let firstWeekdayOfMonth = new Date(year, monthNr, 1).getDay() - 1;
    if (firstWeekdayOfMonth < 0) {
        firstWeekdayOfMonth += 7;
    }

    // Create empty divs
    const emptyDivs = [];
    for (let i = 0; i < firstWeekdayOfMonth; i++) {
        const div = document.createElement('div');
        emptyDivs.push(div);
    }
    calendarBody.append(...emptyDivs);

    // Gets the year, month + 1 to move to next month 
    // 0 with represents the first day of the previous month
    // calls getDate wich gives us the last date of the month
    const daysInTheMonth = new Date(year, monthNr + 1, 0).getDate();
    
    // Array to store all day divs
    const monthDivs = [];

    // Loop through all days in month and creates new divs and class => []
    for (let i = 1; i <= daysInTheMonth; i++) {
        const div = document.createElement('div');
        div.textContent = i;
        div.classList.add('day')
        monthDivs.push(div);
    }
    
    // Add day divs to calendar body
    calendarBody.append(...monthDivs);

    // Call the renderCalendarHolidays function to display the holidays for the current month
    await renderCalendarHolidays(monthNr, year);

    const prevBtn = document.querySelector('.calendar-prev-btn');
    prevBtn.onclick = () => {
        monthNr--;
        if (monthNr < 0) {
            monthNr = 11;
            year--;
        }
        renderCalander();
        monthAndYear.innerHTML = months[monthNr] + " " + year;
    }

    const nextBtn = document.querySelector('.calendar-next-btn');
    nextBtn.onclick = () => {
        monthNr++;
        if (monthNr > 11) {
            monthNr = 0;
            year++;
        }
        renderCalander();
        monthAndYear.innerHTML = months[monthNr] + " " + year;
    }
    getCurrentDay();
    showTodosInCalendar(monthNr, year);
    updateBackgroundImg();
}

/**
 * Function that creates reminders in calendar for todos
 * @param {HTMLElement} days - A DOM element representing a day in the calendar
 * @param {number} nrOfTodos - The number of todos for the day represented by the `days` element
 */
function createTodoReminder(days, nrOfTodos) {
    getFromLocalStorage();
    
    // Remove any existing reminder elements from the div
    const existingReminders = days.querySelectorAll('.reminder');
    for (const reminder of existingReminders) {
        reminder.parentNode.removeChild(reminder);
    }
    
    // Check if there are already one or more reminder elements present in the div
    const existingReminder = days.querySelector('.reminder');
    
    if (existingReminder) {
        if (!nrOfTodos) {
            days.remove(existingReminder);
        } else {
            // If there are already one or more reminder elements present, update the text of the first one
            existingReminder.innerHTML = nrOfTodos;
        }
        
    } else if (nrOfTodos) {
        // If there are no reminder elements present, add a new one
        const taskReminder = document.createElement('div');
        days.appendChild(taskReminder);
        taskReminder.classList.add('reminder');
        
        // Update number inside todo
        taskReminder.innerHTML = nrOfTodos;
    }
}

/**
 * setFormat function
 * @param {string} dayValue - A string representing a date in the format 'YYYY-M-D'
 * @return {string} - A string representing the date in the format 'YYYY-MM-DD'
 */
function setFormat(dayValue) {
    // Split the dayValue string into an array
    let dayValueArray = dayValue.split('-');

    // Extract the year, month, and day from the array
    let year = dayValueArray[0];
    let month = dayValueArray[1];
    let day = dayValueArray[2];
  
    // Add leading zeros to the month and day if they're single digits
    if (month.length == 1) {
      month = month.padStart(2, "0");
    }
    if (day.length == 1) {
      day = day.padStart(2, "0");
    }
  
    // Rebuild the date string with the formatted year, month, and day
    let formattedDateString = `${year}-${month}-${day}`;
  
    return formattedDateString;
}

/**
 *  Adds colour on todays day 
*/
function getCurrentDay() {
    
    // Gets all today-elements in days = []
    const days = [...document.getElementsByClassName('day')];
    const currentDay = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
    
    // Loop through all days
    for (i = 0; i < days.length; i++) {
        const day = i + 1;
        let dayValue = (year + "-" + (monthNr) + "-" + day)
        
        if (currentDay === dayValue) {
            days[i].classList.add('current-day');
        }
    }
}

/**

Render calendar holidays
@param {number} monthNr - Month number, 0-11
@param {number} year - Full year, eg. 2021
*/
async function renderCalendarHolidays(monthNr, year) {
    let holidays = await fetchHolidays(monthNr, year); 
    appendHolidayToMonthDiv(holidays);
}

/**
 * Fetch Swedish holidays from the sholiday.faboul.se API
@param {number} monthNr - Month number, 0-11
@param {number} year - Full year, eg. 2021
@returns {Array} Array of holiday objects
*/
async function fetchHolidays(monthNr, year) { 
    const currentDate = new Date(year, monthNr);
    const fullYear = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const response = await fetch(`https://sholiday.faboul.se/dagar/v2.1/${fullYear}/${month}`);
    const result = await response.json();

        //Push all holidays to the holiday array
        const holidays = [];
        for (let day of result.dagar) {
            if (day.helgdag) {
                holidays.push(day); 
            }
        }
    return holidays;
}

/**
Appends holiday to the month divs
@param {Array} holidays - An array of holiday objects
*/
function appendHolidayToMonthDiv(holidays) {

    const days = [...document.getElementsByClassName('day')];

    for (let i = 0; i < days.length; i++) {
        let day = i + 1;
        let dayValue = (year + "-" + (monthNr + 1) + "-" + day)
        // change formatting to match todoDate
        let formattedDateString = setFormat(dayValue);
        
        for (let holiday of holidays) {
            if (holiday.datum === formattedDateString) {
                const holidayElement = document.createElement('div');
                holidayElement.innerHTML = holiday.helgdag;
                days[i].appendChild(holidayElement);
                holidayElement.classList.add('holiday');
            }
        }
    }
}
