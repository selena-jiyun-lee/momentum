const weather = document.querySelector(".js-weather");

const API_KEY = "2d6ccbdb3fef884b7154068edc08a4ba";
const COORDS_LS = 'coords';

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json) {
        const temprature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temprature}&deg<br/>${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function geoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = { latitude, longitude };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function geoError() {
    console.log("Can't get location");
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if(loadedCoords === null) {
        getCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();