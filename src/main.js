import Vue from 'vue'
import App from './App.vue'
import VueSimpleAlert from "vue-simple-alert";

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'



Vue.use(VueSimpleAlert);
Vue.config.productionTip = false

 

new Vue({
  render: h => h(App),
}).$mount('#app')
