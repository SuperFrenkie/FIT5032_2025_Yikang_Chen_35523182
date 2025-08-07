<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" v-model="username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = () => {
  if (login(username.value, password.value)) {
    router.push('/about') // Redirect to a protected route on successful login
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 50px;
}
</style> 