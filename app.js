import 'regenerator-runtime/runtime';
import axios from 'axios'


const input = document.querySelector('input')
const button = document.querySelector('button')
const locationContainer = document.getElementById('location')
//ac5bfa3ccccf4780806122315221405

const fetchWeather = async (loc) => {
    let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}&aqi=no`)
    let data = await response.data
    let currentData = await data.current
    let currentLocation = await data.location
    console.log(currentData);
    console.log(currentLocation);
    locationContainer.innerHTML = currentLocation.name + ' ' + currentLocation.country
}


button.addEventListener('click', (e) => {
    e.preventDefault()
    fetchWeather(input.value)
})