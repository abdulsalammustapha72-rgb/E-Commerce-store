const weatherInput = document.querySelector('.weather__input')
const city = document.querySelector('.city')
const temperature = document.querySelector('.temp')
const weather = document.querySelector('.condition')

const API_KEY = '1f946aa8695e1d0b4aaef3dae4eb4955'

weatherInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
        const location = weatherInput.value

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)
        const data = await response.json()

        city.innerHTML = data.name
        temperature.innerHTML = `${Math.round(data.main.temp)}C`
        weather.innerHTML = data.weather[0].main
    }
})

