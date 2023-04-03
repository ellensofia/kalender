/**
 * Function that renders new background image each month
 */
function updateBackgroundImg() {

    const urlsToImages = [
        "url(images/januari.jpg",
        "url(images/februari.jpg",
        "url(images/mars.jpg",
        "url(images/april.jpg",
        "url(images/maj.jpeg",
        "url(images/juni.jpg",
        "url(images/juli.jpeg",
        "url(images/augusti.jpg",
        "url(images/september.jpeg",
        "url(images/oktober.jpeg",
        "url(images/november.jpeg",
        "url(images/december.jpeg"
    ]
    
    const backgroundElement = document.querySelector("html");
    backgroundElement.style.backgroundImage = urlsToImages[monthNr];
}