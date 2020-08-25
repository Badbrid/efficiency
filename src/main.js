import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import axios from './utils/request';
import filters from './utils/filter';
import message from './utils/message';
import icon from './utils/icon';
import VueClipboard from 'vue-clipboard2';
import { permission, roles } from './utils/permission';
// 全局组件
import { NewDialog } from './components/common/dialog/index.js';
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.$axios = axios;

Vue.use(NewDialog);

Vue.use(filters);

Vue.use(icon);

Vue.use(VueClipboard);

Vue.use(message);

// v-permission
Vue.directive('permission', permission);

// v-roles
Vue.directive('roles', roles);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
