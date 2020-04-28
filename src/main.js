import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueClipboard from 'vue-clipboard2';
import VueToastr from 'vue-toastr';
import vuetify from './plugins/vuetify';
import { BootstrapVue} from 'bootstrap-vue';
import Vuelidate from 'vuelidate'


//Bootstrap Vue configuration

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueClipboard)
Vue.use(VueToastr);


// axios configuration
axios.defaults.baseURL='http://localhost:3000'


Vue.config.productionTip = false


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
