const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
function getAPIKey() {
  // eslint-disable-next-line no-undef
  return process.env.API_KEY
}

export async function getWeather(city, isFareheit) {
  try {
    const unitGroup = isFareheit ? 'us' : 'metric'
    const searchParams = new URLSearchParams()
    searchParams.append('key', getAPIKey())
    searchParams.append('unitGroup', unitGroup)
    searchParams.append('iconSet', 'icons1')
    const url = `${BASE_URL}${city}/today/next7days?${searchParams}`
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw new Error('Not valid city')
    const json = await response.json()
    return json
  } catch (err) {
    console.error(err)
    throw err
  }
}

export function normalizeTodayData(data) {
  const arr = []
  const current = Number(data.currentConditions.datetime.split(':')[0])
  const today = data.days[0].hours
  const tomorrow = data.days[1].hours
  const result = arr.concat(today.slice(current), tomorrow).slice(0, 10)
  return result
}

export function normalizePrediction(data) {
  return data.days.slice(0, 7)
}
