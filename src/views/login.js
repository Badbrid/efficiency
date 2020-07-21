import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './Login.vue';
import axios from './utils/request';
// import i18n from "../i18n/i18n";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value)
});

Vue.use(ElementUI);

Vue.prototype.$axios = axios;

new Vue({
	el: '#login',
	//   i18n,
	render: h => h(Login)
});
