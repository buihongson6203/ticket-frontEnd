import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import "toastr/build/toastr.min.css";
var app = createApp(App);
app.use(router);
app.mount('#app');
