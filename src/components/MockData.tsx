import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'

const cities = [
  'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Rio de Janeiro', 'Moscow', 'Berlin', 'Toronto',
  'Mumbai', 'Beijing', 'Cairo', 'Los Angeles', 'Rome', 'Bangkok', 'Cape Town', 'Istanbul', 'Mexico City', 'Seoul'
]

const weatherIcons = {
  Sunny: Sun,
  Cloudy: Cloud,
  Rainy: CloudRain,
  Windy: Wind,
}

const getRandomWeather = () => {
  const weathers = Object.keys(weatherIcons)
  return weathers[Math.floor(Math.random() * weathers.length)]
}

const getRandomTemperature = () => Math.floor(Math.random() * 35) + 5 // 5°C to 40°C

const getRandomCities = (count: number) => {
  const shuffled = [...cities].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export default function MockData() {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const selectedCities = getRandomCities(6)
    const data = selectedCities.map(city => ({
      city,
      weather: getRandomWeather(),
      temperature: getRandomTemperature(),
    }))
    setWeatherData(data)
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="text-white mb-4">Global Weather</h2>
      <div className="row">
        {weatherData.map((item, index) => {
          const WeatherIcon = weatherIcons[item.weather]
          return (
            <div key={index} className="col-md-4 mb-4">
              <div className="card bg-dark text-white">
                <div className="card-body">
                  <h3 className="card-title">{item.city}</h3>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <WeatherIcon className="text-warning me-2" size={24} />
                      <span>{item.weather}</span>
                    </div>
                    <span className="h4 mb-0">{item.temperature}°C</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

