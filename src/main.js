import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import axios from './utils/request';
import VueClipboard from 'vue-clipboard2';
// 全局组件
import { NewDialog } from './components/common/dialog/index.js';
console.log(NewDialog);
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

Vue.use(NewDialog);

Vue.use(VueClipboard);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
