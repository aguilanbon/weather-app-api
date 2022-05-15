import 'regenerator-runtime/runtime';
import axios from 'axios'


const input = document.querySelector('input')
const button = document.querySelector('button')
const inText = document.querySelector('.in')
const weatherCondition = document.getElementById('weather-condition')
const temp = document.getElementById('temp')
const ul = document.querySelector('ul')
const autocomplete = document.querySelector('.autocomplete-container')


const locationCity = document.getElementById('weather-location__city')
const locationCountry = document.getElementById('weather-location__country')
//ac5bfa3ccccf4780806122315221405

const fetchWeather = async (loc) => {
    try {

        let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}&aqi=no`)
        let data = await response.data
        let currentData = await data.current
        let currentLocation = await data.location
        let condition = currentData.condition

            temp.innerHTML = `${currentData.temp_c}&#176`
            weatherCondition.innerText = condition.text
            inText.classList.add('visible')
            document.getElementById('weather-icon').src = condition.icon
            locationCity.innerHTML = `${currentLocation.name},`
            locationCountry.innerHTML = currentLocation.country

            input.value = ''
            ul.innerHTML = ""

    } catch (error) {
        if(error.response.status) {
            locationCity.innerHTML = "404"
            locationCountry.innerHTML = "No location found..."

            temp.innerHTML = ''
            weatherCondition.innerText = ''
            inText.classList.remove('visible')
            inText.classList.add('hidden')
            document.getElementById('weather-icon').src = ''
            input.value = ''
        }
    }
   
}

const fetchWeatherAutoComplete = async (loc) => {
    let response = await axios.get(`http://api.weatherapi.com/v1/search.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}`)
    let data = await response.data

    
    data.forEach(city => {
            if(ul.children.length <= 8) {
                const li = document.createElement('li')
                const searchCity = document.createElement('p')
                searchCity.innerText = `${city.name}`
                li.appendChild(searchCity)
                ul.appendChild(li)
                ul.classList.add('visible')
                

                li.addEventListener('click', () => {
                    fetchWeather(city.name)
                })
            }
        }) 
}



button.addEventListener('click', (e) => {
    e.preventDefault()
    if(ul.children.length >= 1) {
        fetchWeather(input.value)
        ul.innerHTML = ""
    }
})


input.addEventListener('input', async (e) => {
    e.preventDefault()
    ul.innerHTML = ""
    await fetchWeatherAutoComplete(e.target.value)
})

// document.querySelector('.container').addEventListener('click', () => {
//     ul.innerHTML = ""
// })