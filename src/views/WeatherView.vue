<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
          @keyup.enter="searchByCity"
        />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>

    <main>
      <!-- Loading Indicator -->
      <div v-if="loading">
        <p>Loading...</p>
      </div>

      <!-- Error Message -->
      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
      </div>

      <!-- Weather Data Display -->
      <div v-else-if="weatherData" class="weather-info">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p class="temperature">{{ temperature }} °C</p>
        </div>
        <span class="description">{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const apikey = '27c472517be90097bae7b0f495a8b2f4'

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
      error: null,
      loading: false
    }
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null
    }
  },
  mounted() {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        this.loading = true
        this.error = null
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
            await this.fetchWeatherData(url)
          },
          (err) => {
            this.loading = false
            this.error =
              'Unable to retrieve your location. Please allow location access in your browser settings and refresh the page.'
            console.error(err)
          }
        )
      } else {
        this.loading = false
        this.error = 'Geolocation is not supported by this browser.'
      }
    },
    async fetchWeatherData(url) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(url)
        this.weatherData = response.data
      } catch (error) {
        this.error = 'Could not fetch weather data. Please check the city name or your network connection.'
        this.weatherData = null
      } finally {
        this.loading = false
      }
    },
    async searchByCity() {
      if (!this.city) {
        this.error = 'Please enter a city name.'
        return
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}&units=metric`
      await this.fetchWeatherData(url)
    }
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
.search-bar {
  margin: 20px 0;
}
.search-input {
  margin-right: 5px;
}
.error-message {
  color: red;
  margin-top: 20px;
}
.temperature {
  font-size: 2em;
  font-weight: bold;
}
.description {
  text-transform: capitalize;
}
</style> 