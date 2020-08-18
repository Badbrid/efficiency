import { TokenKey } from './constants';

export function saveLocalStorage(response) {
	// 登录信息保存 cookie
	localStorage.setItem(TokenKey, response.message);
	let rolesArray = response.data.roles;
	let roles = rolesArray.map(r => r.id);
	// 保存角色
	localStorage.setItem('roles', roles);
}

export function getCurrentUser() {
	return JSON.parse(localStorage.getItem(TokenKey));
}
