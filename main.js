const container = document.querySelector('.container');
let tempContainer = document.querySelector('.tempContainer');
let temperature = document.querySelector('.temperature');
let minTemp = document.querySelector('.minTemp');
let maxTemp = document.querySelector('.maxTemp');
let humidity = document.querySelector('.humidity');
let windSpeed = document.querySelector('.windSpeed');
let weather = document.querySelector('.weather');
let search = document.querySelector('#search');
let searchBtn = document.querySelector('#searchBtn');
let fBtn = document.querySelector('#fBtn');
let cBtn = document.querySelector('#cBtn');
let currentTemp = 0;
let currentMin = 0;
let currentMax = 0;


fBtn.addEventListener('click', () => {
    if(fBtn.classList.contains('active') === false){
        temperature.removeChild(temperature.lastChild)
        minTemp.removeChild(minTemp.lastChild)
        maxTemp.removeChild(maxTemp.lastChild)
        let fTemp = 1.8 * (currentTemp) + 32;
        let fMin = 1.8 * (currentMin) + 32;
        let fMax = 1.8 * (currentMax) + 32;
        currentTemp = fTemp;
        currentMin = fMin;
        currentMax = fMax;
        temperature.innerHTML += fTemp.toFixed(2);
        minTemp.innerHTML += fMin.toFixed(2);
        maxTemp.innerHTML += fMax.toFixed(2);
        fBtn.classList.toggle('active');
        cBtn.classList.toggle('active');
    }
});

cBtn.addEventListener('click', () => {
    if(cBtn.classList.contains('active') === false){
        temperature.removeChild(temperature.lastChild)
        minTemp.removeChild(minTemp.lastChild)
        maxTemp.removeChild(maxTemp.lastChild)
        let cTemp = (currentTemp -32) / 1.8;
        let cMin = (currentMin -32) / 1.8;
        let cMax = (currentMax -32) / 1.8;
        currentTemp = cTemp;
        currentMin = cMin;
        currentMax = cMax;
        temperature.innerHTML += cTemp.toFixed(2);
        minTemp.innerHTML += cMin.toFixed(2);
        maxTemp.innerHTML += cMax.toFixed(2);
        cBtn.classList.toggle('active');
        fBtn.classList.toggle('active');
    }
});

searchBtn.addEventListener('click', () => {
    event.preventDefault();
    async function searchWeather() {
    weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${search.value}&APPID=8b53cc1dbafbd58a0b8cc34de4dcd7cb`;
    const response = await fetch(weatherAPI, {mode: 'cors'});
    const weatherData = await response.json();

    temperature.removeChild(temperature.lastChild)
    minTemp.removeChild(minTemp.lastChild)
    maxTemp.removeChild(maxTemp.lastChild)
    humidity.removeChild(humidity.lastChild)
    windSpeed.removeChild(windSpeed.lastChild)
    weather.removeChild(weather.lastChild)
    let location = document.createElement('h3');
    location.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
    container.before(location);
    let fTemp = 1.8 * (weatherData.main.temp -273) + 32;
    let fmin = 1.8 * (weatherData.main.temp_min -273) + 32;
    let fmax = 1.8 * (weatherData.main.temp_max -273) + 32;
    currentTemp = fTemp;
    currentMin = fmin;
    currentMax = fmax;
    temperature.innerHTML += fTemp.toFixed(2);
    minTemp.innerHTML += fmin.toFixed(2);
    maxTemp.innerHTML += fmax.toFixed(2);
    humidity.innerHTML += weatherData.main.humidity;
    windSpeed.innerHTML += weatherData.wind.speed;
    weather.innerHTML += weatherData.weather[0].main;
    if(cBtn.classList.contains('active')) {
        fBtn.classList.toggle('active');
        cBtn.classList.toggle('active');
    }
}
searchWeather();
});

async function defaultWeather() {

    const defaultResponse = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8b53cc1dbafbd58a0b8cc34de4dcd7cb', {mode: 'cors'});
    const defaultWeatherData = await defaultResponse.json();
    let location = document.createElement('h3');
    location.innerHTML = `${defaultWeatherData.name}, ${defaultWeatherData.sys.country}`;
    container.before(location);
    let fTemp = 1.8 * (defaultWeatherData.main.temp -273) + 32;
    let fmin = 1.8 * (defaultWeatherData.main.temp_min -273) + 32;
    let fmax = 1.8 * (defaultWeatherData.main.temp_max -273) + 32;
    currentTemp = fTemp;
    currentMin = fmin;
    currentMax = fmax;
    temperature.innerHTML 
    temperature.innerHTML += fTemp.toFixed(2);
    minTemp.innerHTML += fmin.toFixed(2);
    maxTemp.innerHTML += fmax.toFixed(2);
    humidity.innerHTML += defaultWeatherData.main.humidity;
    windSpeed.innerHTML += defaultWeatherData.wind.speed;
    weather.innerHTML += defaultWeatherData.weather[0].main;

}
defaultWeather();