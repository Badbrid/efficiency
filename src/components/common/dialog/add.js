import template from './template.vue';

export default {
	name: 'newDialog',
	extends: template,
	data() {
		return {
			title: '新增代理配置'
		};
	},
	methods: {
		submitFrom() {
			this.$refs['form'].validate(valid => {
				if (valid) {
					this.submit(this.form);
				}
			});
		},
		submit(data) {}
	}
};
