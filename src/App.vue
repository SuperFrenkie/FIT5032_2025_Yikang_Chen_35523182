<script setup>
import JSON from "./components/JSON.vue"
import JSONSolution from "./components/JSONSolution.vue"
import Form from "./components/Form.vue";
</script>

<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">Library Application</a>
      </div>
    </nav>

    <main>
      <!-- <JSON /> -->
      <!-- <JSONSolution /> -->
      <Form />
    </main>

    <footer class="mt-5 py-3 text-center text-muted">
      <div class="container">
        <p>© 2023 Library Application - FIT5032 Assignment</p>
      </div>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.navbar-brand {
  font-weight: bold;
  letter-spacing: 1px;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .navbar-brand {
    font-size: 1.1rem;
  }
}
</style>
