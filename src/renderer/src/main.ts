import 'virtual:uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import directive from './directives'
import router from './router'
import pinia from './store'

const app = createApp(App)
app.use(directive)
app.use(pinia)
app.use(router)
app.mount('#app')
