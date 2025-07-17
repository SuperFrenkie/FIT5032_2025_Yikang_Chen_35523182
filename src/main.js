import './assets/main.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.mount('#app')
