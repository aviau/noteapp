import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import './styles.css';
import App from './App.vue';

// Create App
const app = createApp(App);

// Setup Plugins
app.use(VueQueryPlugin);

// Mount
app.mount('#app');
