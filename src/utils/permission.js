import { hasRolePermissions, hasRoles } from './utils';

export const permission = {
	inserted(el, binding) {
		checkRolePermission(el, binding, 'permission');
	}
};

export const roles = {
	inserted(el, binding) {
		checkRolePermission(el, binding, 'roles');
	}
};

function checkRolePermission(el, binding, type) {
	const { value } = binding;
	// const rolesString = localStorage.getItem('roles');
	// const roles = rolesString.split(',');
	if (value && value instanceof Array && value.length > 0) {
		const permissionRole = value;
		let hasPermission = false;
		if (type === 'roles') {
			hasPermission = hasRoles(...permissionRole);
		} else if (type === 'permission') {
			hasPermission = hasRolePermissions(...permissionRole);
		}
		if (!hasPermission) {
			el.parentNode && el.parentNode.removeChild(el);
		}
	} else {
		el.parentNode && el.parentNode.removeChild(el);
	}
}
