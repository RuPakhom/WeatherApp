const BASE_URL =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
function getAPIKey() {
  // eslint-disable-next-line no-undef
  return process.env.API_KEY
}

export async function getWeather(city) {
  try {
    const searchParams = new URLSearchParams()
    searchParams.append('key', getAPIKey())
    searchParams.append('unitGroup', 'metric')
    searchParams.append('iconSet', 'icons1')
    console.log(searchParams.toString())
    const url = `${BASE_URL}${city}/today/next7days?${searchParams}`
    const response = await fetch(url, { mode: 'cors' })
    if (!response.ok) throw 'Not valid city'
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
  console.log(result)
  return result
}

export function normalizePrediction(data) {
  return data.days.slice(0, 7)
}
