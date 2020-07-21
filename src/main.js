import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import axios from './utils/request';
// 全局组件
import dialog from './components/common/dialog/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

Vue.use(dialog);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
