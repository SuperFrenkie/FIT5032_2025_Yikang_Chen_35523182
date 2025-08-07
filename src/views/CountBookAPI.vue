<template>
  <div v-if="apiResponse" class="api-response">
    <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
  </div>
  <div v-else-if="loading">
    <p>Loading API data...</p>
  </div>
  <div v-else-if="error">
    <p class="text-danger">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    // Assuming the JSON structure has a 'famousWorks' array for each author
    return total + (author.famousWorks ? author.famousWorks.length : 0)
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Correct way to fetch from public assets in Vite
    const response = await fetch('/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    calculateStats()

    apiResponse.value = {
      success: true,
      data: {
        authorsCount: authorsCount.value,
        totalBooks: totalBooks.value,
        authors: authors.value.map(author => ({
          name: author.name,
          bookCount: author.famousWorks ? author.famousWorks.length : 0,
        }))
      },
      timestamp: new Date().toISOString()
    }
    
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
    apiResponse.value = null // Clear response on error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getApiData();
})
</script>

<style scoped>
.api-response {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style> 