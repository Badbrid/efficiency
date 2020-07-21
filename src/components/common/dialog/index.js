import newDialog from './add';

// const NewDialog = {
// 	install: function(Vue, data) {
// 		Vue.prototype.$newDialog = (options, callback) => {
// 			const NewDialogConstructor = Vue.extend(newDialog),
// 				instance = new NewDialogConstructor({
// 					data: options.data || {},
// 					options,
// 					callback
// 				});

// 			instance.$mount();
// 			instance.removeEl = function() {
// 				var el = this.$el;
// 				if (el && el.parentNode) {
// 					el.parentNode.removeChild(el);
// 				}
// 			};
// 			document.body.appendChild(instance.$el);
// 		};
// 	}
// };

const NewDialog = {
	install: function(Vue, data) {
		Vue.prototype.$newDialog = (options, callback) => {
			const NewDialogConstructor = Vue.extend(newDialog),
				instance = new NewDialogConstructor({
					data: options.data || {},
					options,
					callback
				});

			instance.$mount();
			instance.removeEL = function() {
				var el = this.$el;
				if (el && el.parentNode) {
					el.parentNode.removeChild(el);
				}
			};
			document.body.appendChild(instance.$el);
		};
	}
};

export { NewDialog };
