import { TokenKey, User, ROLE_ADMIN, ROLE_TEST_MANAGER, ROLE_TEST_USER } from './constants';

export function saveLocalStorage(response) {
	localStorage.setItem(User, JSON.stringify(response.data));
	// 登录信息保存 cookie
	localStorage.setItem(TokenKey, response.message);
	let rolesArray = response.data.roles;
	let roles = rolesArray.map(r => r.id);
	// 保存角色
	localStorage.setItem('roles', roles);
}

export function getCurrentUser() {
	return JSON.parse(localStorage.getItem(User));
}

export function hasRoles(...roles) {
	let user = getCurrentUser();
	let rs = user.roles.map(r => r.id);
	for (let item of roles) {
		if (rs.indexOf(item) > -1) {
			return true;
		}
	}
	return false;
}

export function hasRolePermissions(...roles) {
	for (let role of roles) {
		if (hasRolePermission(role)) {
			return true;
		}
	}
	return false;
}

export function hasRolePermission(role) {
	let user = getCurrentUser();
	for (let ur of user.userRoles) {
		if (role === ur.roleId) {
			if (ur.roleId === ROLE_ADMIN) {
				return true;
			} else if (ur.roleId === ROLE_TEST_USER) {
				return true;
			} else if (ur.roleId === ROLE_TEST_VIEWER) {
				return true;
			}
		}
	}
	return false;
}

export function checkoutTestManagerOrTestUser() {
	return hasRolePermissions(ROLE_TEST_MANAGER, ROLE_TEST_USER);
}
