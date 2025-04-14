import './style.css'
import { getWeather } from './weather.js'
import { renderCard } from './ui.js'
import { renderExportCards } from './ui.js'
import { renderTodayPrediction } from './ui.js'
import { renderWeeklyPrediction } from './ui.js'
import { normalizeTodayData } from './weather.js'
import { normalizePrediction } from './weather.js'
import { showContainer } from './ui.js'

const input = document.querySelector('#city')
const button = document.querySelector('#search')

button.addEventListener('click', () => {
  const city = input.value
  if (!city) return
  getWeather(city)
    .then((data) => {
      showContainer()
      renderCard(data)
      renderTodayPrediction(normalizeTodayData(data))
      renderWeeklyPrediction(normalizePrediction(data))
      renderExportCards(data)
    })
    .catch((err) => console.log(err))
})
