/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
axios.defaults.baseURL = 'https://antunezcantero.pythonanywhere.com/api'

// vue phone input code country
import VueTelInput from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';

const VueTelInputOptions = {
    mode: "international"
}

export function registerPlugins (app) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(VueTelInput)
}
