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
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
            primary: '#0066ff'
        }
      },
    },
    font: {
        family: 'Roboto' 
    },
    icons: {
        defaultSet: 'mdi'
    },
  },
})

const app = createApp(App)

app.use(router).use(store).use(vuetify).mount('#app')

app.config.globalProperties.$log = console.log


