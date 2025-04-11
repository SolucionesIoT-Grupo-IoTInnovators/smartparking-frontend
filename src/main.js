import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';

const app = createApp(App)
  .use(PrimeVue)
  .component('Button', Button)
  .mount('#app');