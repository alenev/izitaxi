import './bootstrap';
import { createApp } from 'vue/dist/vue.esm-bundler.js';
import App from './App.vue';
import router from './Router';
import store from './Store';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
  },
})

const app = createApp(App)

app.use(router).use(store).use(vuetify).mount('#app')

app.config.globalProperties.$log = console.log


