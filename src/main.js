import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from './router'
import axios from 'axios';

import fontawesome from './plugins/fontawesome';
import 'bootstrap/dist/css/bootstrap.css';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

axios.defaults.withCredentials = true;

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(vuetify);
app.use(router);
app.use(fontawesome);

app.mount("#app");


import 'bootstrap/dist/js/bootstrap';
