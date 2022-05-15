import 'regenerator-runtime/runtime';
import axios from 'axios'


const input = document.querySelector('input')
const button = document.querySelector('button')
const inText = document.querySelector('.in')
const weatherCondition = document.getElementById('weather-condition')
const temp = document.getElementById('temp')
const ul = document.querySelector('ul')


//forecast
const tempForecast = document.querySelector('.weather-forecast')

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

        let responseForecast = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ac5bfa3ccccf4780806122315221405&q=${loc}&days=3&aqi=no&alerts=no`)

        let forecastData = await responseForecast.data.forecast.forecastday

        tempForecast.innerHTML = ""

        forecastData.forEach(data => {
            let condition = data.day
            console.log(data.date);

                const tempContainer = document.createElement('div')
                tempContainer.classList.add('temp-container__forecast')

                const foreCastCondition = document.createElement('div')
                foreCastCondition.classList.add('condition-container__forecast')

                const forecastContainer = document.createElement('div')
                forecastContainer.classList.add('forecast-container')

                const topContainer = document.createElement('div')
                topContainer.classList.add('top-container')

                const dateContainer = document.createElement('div')
                dateContainer.classList.add('date-container')



                const h1 = document.createElement('h1')
                    h1.innerHTML = `${condition.avgtemp_c}&#176`
                    tempContainer.appendChild(h1)
                    
                const h3 = document.createElement('h3')
                    h3.innerHTML = data.day.condition.text
                    foreCastCondition.appendChild(h3)

                const icon = document.createElement('img')
                    icon.src = data.day.condition.icon
                    foreCastCondition.appendChild(icon)

                topContainer.innerHTML = data.date

                forecastContainer.appendChild(topContainer)
                forecastContainer.appendChild(tempContainer)
                forecastContainer.appendChild(foreCastCondition)
                tempForecast.appendChild(forecastContainer)
        })

            temp.innerHTML = `${currentData.temp_c}&#176`
            weatherCondition.innerText = condition.text
            inText.classList.add('visible')
            document.getElementById('weather-icon').src = condition.icon
            locationCity.innerHTML = `${currentLocation.name},`
            locationCountry.innerHTML = currentLocation.country

            input.value = ''
            ul.innerHTML = ""
            

    } catch (error) {
        console.log(error);
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

document.addEventListener('click', (e) => {
    const isInside = input.contains(e.target)

    if(!isInside) {
        ul.innerHTML = ''
    }
})

// document.querySelector('.container').addEventListener('click', () => {
//     ul.innerHTML = ""
// })