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

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{
			name: 'index',
			path: '/',
			redirect: '/logProxy'
		},
		// {
		// 	path: '/login',
		// 	name: 'login',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
		// },
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
			name: 'default_404',
			path: '404',
			component: testProcessName
		}
	]
	// scrollBehavior(to, from, savedPosition) {
	// 	return { x: 0, y: 0 };
	// }
});

export default router;
