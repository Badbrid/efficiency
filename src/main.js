import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import axios from './utils/request';
// 全局组件
import { NewDialog } from './components/common/dialog/index.js';
console.log(NewDialog);
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

Vue.use(NewDialog);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
