import 'regenerator-runtime/runtime';
import axios from 'axios'


const input = document.querySelector('input')
const button = document.querySelector('button')
const inText = document.querySelector('.in')
const weatherCondition = document.getElementById('weather-condition')
const temp = document.getElementById('temp')

const locationCity = document.getElementById('weather-location__city')
const locationCountry = document.getElementById('weather-location__country')
//ac5bfa3ccccf4780806122315221405

const fetchWeather = async (loc) => {
    let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}&aqi=no`)
    let data = await response.data
    let currentData = await data.current
    let currentLocation = await data.location
    let condition = currentData.condition
    console.log(currentData);
    console.log(currentLocation);
    temp.innerHTML = `${currentData.temp_c}&#176`
    weatherCondition.innerText = condition.text
    inText.classList.add('visible')
    document.getElementById('weather-icon').src = condition.icon
    locationCity.innerHTML = `${currentLocation.name},`
    locationCountry.innerHTML = currentLocation.country
}

const fetchWeatherAutoComplete = async (loc) => {
    let response = await axios.get(`http://api.weatherapi.com/v1/search.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}`)
    let data = await response.data
    console.log(data);
}



button.addEventListener('click', (e) => {
    e.preventDefault()
    fetchWeather(input.value)
})


input.addEventListener('change', (e) => {
    e.preventDefault()
    fetchWeatherAutoComplete(e.target.value)
})