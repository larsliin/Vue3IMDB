import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router';

import MainNavigation from './components/MainNavigation.vue';

import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-utilities.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const pinia = createPinia()
const app = createApp(App);
app.component('MainNavigation', MainNavigation);

app.use(router);
app.use(pinia);
app.mount('#app');
