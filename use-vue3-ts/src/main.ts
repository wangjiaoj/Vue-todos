import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vantTool from './components/vant-import'
import './mock/list.js'
const app = createApp(App);
vantTool.install(app);
app.use(store).use(router).mount('#app')

//vue devtool
const win: any = window
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}

 