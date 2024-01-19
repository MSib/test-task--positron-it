import { createApp } from 'vue'
import './font-lato.css'
import './font-roboto.css'
import './style.css'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
