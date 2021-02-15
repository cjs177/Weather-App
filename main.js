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
        console.log(currentTemp);
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
    let weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${search.value}&APPID=8b53cc1dbafbd58a0b8cc34de4dcd7cb`;
    console.log(weatherAPI);
    fetch(weatherAPI, {mode: 'cors'})
.then(function(response) {
    return response.json();
})
.then(function(response) {
    //container.appendChild(country);
    temperature.removeChild(temperature.lastChild)
    minTemp.removeChild(minTemp.lastChild)
    maxTemp.removeChild(maxTemp.lastChild)
    humidity.removeChild(humidity.lastChild)
    windSpeed.removeChild(windSpeed.lastChild)
    weather.removeChild(weather.lastChild)
    //let city = document.createElement('h3');
    let location = document.createElement('h3');
    location.innerHTML = `${response.name}, ${response.sys.country}`;
    //city.innerHTML = response.name;
    //country.innerHTML = response.sys.country;
    container.before(location);
    //container.before(country);
    //container.insertBefore(country, city);
    //container.appendChild(country);
    let fTemp = 1.8 * (response.main.temp -273) + 32;
    let fmin = 1.8 * (response.main.temp_min -273) + 32;
    let fmax = 1.8 * (response.main.temp_max -273) + 32;
    currentTemp = fTemp;
    currentMin = fmin;
    currentMax = fmax;
    temperature.innerHTML += fTemp.toFixed(2);
    minTemp.innerHTML += fmin.toFixed(2);
    maxTemp.innerHTML += fmax.toFixed(2);
    humidity.innerHTML += response.main.humidity;
    windSpeed.innerHTML += response.wind.speed;
    weather.innerHTML += response.weather[0].main;
    if(cBtn.classList.contains('active')) {
        fBtn.classList.toggle('active');
        cBtn.classList.toggle('active');
    }
})
.catch(function(error) {
    alert("no results found");
}); 

});

fetch('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8b53cc1dbafbd58a0b8cc34de4dcd7cb', {mode: 'cors'})
.then(function(response) {
    return response.json();
})
.then(function(response) {
    console.log(response);
    console.log(response.main.temp);
    console.log(response.main.temp_min);
    console.log(response.main.temp_max);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    console.log(response.weather[0].main);
    //let city = document.createElement('h3');
    let location = document.createElement('h3');
    location.innerHTML = `${response.name}, ${response.sys.country}`;
    //city.innerHTML = response.name;
    //country.innerHTML = response.sys.country;
    container.before(location);
    //container.before(country);
    //container.insertBefore(country, city);
    //container.appendChild(country);
    let fTemp = 1.8 * (response.main.temp -273) + 32;
    let fmin = 1.8 * (response.main.temp_min -273) + 32;
    let fmax = 1.8 * (response.main.temp_max -273) + 32;
    currentTemp = fTemp;
    currentMin = fmin;
    currentMax = fmax;
    temperature.innerHTML 
    temperature.innerHTML += fTemp.toFixed(2);
    minTemp.innerHTML += fmin.toFixed(2);
    maxTemp.innerHTML += fmax.toFixed(2);
    humidity.innerHTML += response.main.humidity;
    windSpeed.innerHTML += response.wind.speed;
    weather.innerHTML += response.weather[0].main;

});
