import { ref } from 'vue'

export const isAuthenticated = ref(false)

// Hardcoded credentials for demonstration
const credentials = {
  username: 'user',
  password: 'password'
}

/**
 * Logs the user in if the provided credentials are correct.
 * @param {string} username - The username to check.
 * @param {string} password - The password to check.
 * @returns {boolean} - True if login is successful, false otherwise.
 */
export function login(username, password) {
  if (username === credentials.username && password === credentials.password) {
    isAuthenticated.value = true
    return true
  }
  return false
}

/**
 * Logs the user out.
 */
export function logout() {
  isAuthenticated.value = false
} 