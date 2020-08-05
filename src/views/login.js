import Vue from 'vue';
import { Button, Col, Form, FormItem, Input, Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Login from './login.vue';
import axios from '../utils/request';
// import i18n from "../i18n/i18n";

Vue.config.productionTip = false;

// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// });
Vue.prototype.$axios = axios;
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

new Vue({
	el: '#login',
	render: h => h(Login)
});
