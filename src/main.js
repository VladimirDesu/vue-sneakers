import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createWebHistory, createRouter } from 'vue-router'
import Home from './pages/Home.vue'
import Favourites from './pages/Favourites.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/favourites', name: 'Favourites', component: Favourites}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
