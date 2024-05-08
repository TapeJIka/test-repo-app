import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://127.0.0.1/api/'
axios.defaults.headers.authorization = 'Bearer ' + localStorage.getItem('access_token')

createApp(App).use(router).use(VueAxios, axios).mount('#app')
