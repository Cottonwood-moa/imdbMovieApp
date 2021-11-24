import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' //index.js 생략
import store from './store'   // "
import loadImg from './plugins/loadImage'

createApp(App)
  .use(router)
  .use(store)
  .use(loadImg)
  .mount('#app')