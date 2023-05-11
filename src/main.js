import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'jquery'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap/dist/css/bootstrap.min.css";

// import ViewUIPlus from 'view-ui-plus'
// import 'view-ui-plus/dist/styles/viewuiplus.css'

const app = createApp(App)
app.use(store).use(router).mount('#app')
