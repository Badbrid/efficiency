import Vue from 'vue';
import Vuex from 'vuex';
import proxyConfig from './modules/proxyConfig';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	modules: {
		proxyConfig
	}
});
