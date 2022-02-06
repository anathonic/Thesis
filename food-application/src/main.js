import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.js'
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'

createApp(App).use(router).use(store).use(VueCollapsiblePanel).mount('#app')
