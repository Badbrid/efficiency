import Vue from 'vue';
import VueRouter from 'vue-router';
import NavComponent from '../components/common/nav';
//日志代理
import log from '../components/logProxy/log';
import proxyConfiguration from '../components/logProxy/proxyConfiguration';
//接口管理
import apiHome from '../components/api/home';
//测试流程
import testProcessName from '../components/testProcess/home';
import lostPage from '../components/api/404';
import PersonSetting from '../components/common/setting/personal/PersonSetting';

import User from '../components/system/User';

import Setting from '../components/system/Setting';
import axios from 'axios';
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{
			name: 'index',
			path: '/',
			redirect: '/logProxy'
		},
		{
			name: 'logProxy',
			path: '/logProxy',
			redirect: '/logProxy/proxyConfiguration',
			component: NavComponent,
			children: [
				{
					name: 'log',
					path: '/logProxy/log',
					meta: { title: '代理日志', level: 1 },
					component: log
				},
				{
					name: 'proxyConfiguration',
					path: '/logProxy/proxyConfiguration',
					meta: { title: '接口代理配置', level: 1 },
					component: proxyConfiguration
				}
			]
		},
		{
			name: 'api',
			path: '/api',
			redirect: '/api/home',
			component: NavComponent,
			children: [
				{
					name: 'apiHome',
					path: '/api/home',
					meta: { title: '接口管理', level: 1 },
					component: apiHome
				}
			]
		},
		{
			name: 'testProcess',
			path: '/testProcess',
			redirect: '/testProcess/home',
			component: NavComponent,
			children: [
				{
					path: '/testProcess/home',
					name: 'testProcessName',
					meta: { title: '测试管理', level: 1 },
					component: testProcessName
				}
			]
		},
		{
			path: '/systemSetting',
			name: 'systemSetting',
			redirect: '/systemSetting/personsetting',
			component: Setting,
			children: [
				{
					path: '/systemSetting/personsetting',
					name: 'personsetting',
					meta: { title: '系统管理', level: 1 },
					component: PersonSetting
				},
				{
					path: '/systemSetting/user',
					component: User,
					name: 'user',
					meta: { title: '用户管理', level: 1 }
				}
			]
		},
		{
			name: 'default_404',
			path: '/404',
			component: lostPage
		}
	]
	// scrollBehavior(to, from, savedPosition) {
	// 	return { x: 0, y: 0 };
	// }
});

router.beforeEach((to, from, next) => {
	//解决localStorage清空，cookie没失效导致的卡死问题
	if (!localStorage.getItem('Admin-Token')) {
		axios.get(process.env.VUE_APP_API_SYS + '/loginOut');
		console.log('signout');
		localStorage.setItem('Admin-Token', '{}');
		window.location.href = '/login.html';
		next();
	} else {
		next();
	}
});

export default router;
