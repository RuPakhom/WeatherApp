import snowIcon from '../icons/snow.svg'
import rainIcon from '../icons/rain.svg'
import fogIcon from '../icons/fog.svg'
import windIcon from '../icons/wind.svg'
import cloudyIcon from '../icons/cloudy.svg'
import partlyCloudyDay from '../icons/partly-cloudy-day.svg'
import partlyCloudyNight from '../icons/partly-cloudy-night.svg'
import clearDay from '../icons/clear-day.svg'
import clearNight from '../icons/clear-night.svg'

const ICONSET = {
  snow: snowIcon,
  rain: rainIcon,
  fog: fogIcon,
  wind: windIcon,
  cloudy: cloudyIcon,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'clear-day': clearDay,
  'clear-night': clearNight,
}

const container = document.querySelector('.container')

export function renderCard(data) {
  const resolvedCity = document.querySelector('.city')
  const currentTemp = document.querySelector('.current-temp')
  const conditions = document.querySelector('.conditions')
  const min = document.querySelector('.min')
  const max = document.querySelector('.max')
  const icon = document.querySelector('img.icon')
  const date = document.querySelector('.date')

  const iconData = data.currentConditions.icon
  resolvedCity.textContent = data.resolvedAddress.split(',')[0]
  currentTemp.textContent = `${Math.round(data.currentConditions.temp)}°`
  conditions.textContent = data.currentConditions.conditions
  min.textContent = `Min: ${Math.round(data.days[0].tempmin)}°`
  max.textContent = `Max: ${Math.round(data.days[0].tempmax)}°`
  date.textContent = `Weather on ${data.currentConditions.datetime}`
  icon.src = ICONSET[iconData]
}

export function renderTodayPrediction(data) {
  const times = document.querySelectorAll('.time')
  const icons = document.querySelectorAll('.small-icon')
  const temps = document.querySelectorAll('.temp-today')

  data.forEach((item, idx) => {
    if (idx === 0) {
      times[idx].textContent = 'Now'
    } else {
      times[idx].textContent = item.datetime.split(':')[0]
    }
    icons[idx].src = ICONSET[item.icon]
    temps[idx].textContent = `${Math.round(item.temp)}°`
  })
}

export function renderWeeklyPrediction(data) {
  const times = document.querySelectorAll('.time-predict')
  const icons = document.querySelectorAll('.small-icon-predict')
  const min = document.querySelectorAll('.min-predict')
  const max = document.querySelectorAll('.max-predict')

  data.forEach((item, idx) => {
    if (idx === 0) {
      times[idx].textContent = 'Today'
    } else {
      times[idx].textContent = new Date(item.datetime).toLocaleDateString(
        'en-EN',
        { weekday: 'long' }
      )
    }
    icons[idx].src = ICONSET[item.icon]
    min[idx].textContent = `${Math.round(item.tempmin)}°`
    max[idx].textContent = `${Math.round(item.tempmax)}°`
  })
}

export function renderExportCards(data) {
  const current = data.currentConditions
  const sunrise = document.querySelector('.sunrise-data')
  const sunset = document.querySelector('.sunset-data')
  const feelsLike = document.querySelector('.feels-like-data')
  const wind = document.querySelector('.wind-data')
  const humidity = document.querySelector('.humidity-data')
  const visibility = document.querySelector('.visibility-data')

  sunrise.textContent = current.sunrise
  sunset.textContent = current.sunset
  feelsLike.textContent = `${Math.round(current.feelslike)}°`
  wind.textContent = current.windspeed
  humidity.textContent = current.humidity
  visibility.textContent = current.visibility
}

export function showContainer() {
  if (!container.style.display) {
    container.style.display = 'block'
  }
}
