import { PROXYCONFIG } from '../mutation-types';

// initial state
const state = {
	configList: [],
	tableDataReload: false
};
const getters = {
	getConfigListValue: state => {
		return state.configList;
	},
	doneConfigList: (state, getters) => {
		return getters.configList;
	}
};

const mutations = {
	[PROXYCONFIG.GETPROXYCONFIGLIST](state, products) {
		state.configList = products;
	},
	[PROXYCONFIG.PUSH_FORMINLINE](state, formInline) {
		(state.tableDataReload = !state.tableDataReload), (state.configList = formInline);
	},
	[PROXYCONFIG.SETTABLEDATARELOAD](state) {
		state.tableDataReload = !state.tableDataReload;
	}
};

const actions = {
	addSearchUrl(context, formInline) {
		context.commit(PROXYCONFIG.PUSH_FORMINLINE, formInline);
	},
	setReload(context) {
		context.commit(PROXYCONFIG.SETTABLEDATARELOAD);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
