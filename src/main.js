import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus";
import 'flag-icon-css/css/flag-icons.css'
import "element-plus/dist/index.css";

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

app.mount('#app')
