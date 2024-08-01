import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vuetify/styles';

if (process.env.NODE_ENV === 'production') {
    const Vue = require('vue');
    Vue.config.devtools = true;
  }
createApp(App).use(router).use(vuetify).mount('#app');
