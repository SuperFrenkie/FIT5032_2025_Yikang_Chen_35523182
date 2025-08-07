<template>
  <div class="access-denied">
    <h1>Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script setup>
// No script needed for this simple view
</script>

<style scoped>
.access-denied {
  text-align: center;
  margin-top: 50px;
}
</style> 