/**
 * Weekday function is called every time the user resizes the screen
 */
window.addEventListener("resize", function(event) {
    weekday();
});

/**
 * Function that changes the name of the weekdays displayed depending on how big the screen is
 */
function weekday() {
    const allDays = document.querySelectorAll('.weekday');
    const allDaysShort = ["M", "T", "O", "T", "F", "L", "S"]
    const allDaysLong = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]

    if (window.innerWidth <= 880) {

        for (let j = 0; j < allDays.length; j++) {
            allDays[j].innerHTML = allDaysShort[j];
        }

    } else {
        for (let j = 0; j < allDays.length; j++) {
            allDays[j].innerHTML = allDaysLong[j];
        }
    }
}
