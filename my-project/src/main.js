import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Assuming index.js is in the same directory
const app = createApp(App);
app.use(router);
app.mount('#app');
