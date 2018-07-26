function Vue(options) {
	var self = this;
	this.data = options.data;
	this.methods = options.methods;
	//vm实例对data操作
	Object.keys(this.data).forEach(function (key) {
		self.proxyKeys(key);
	});
	//监听data的变化
	observe(this.data);
	//编译模板
	new Compile(options.el, this);
	options.mounted.call(this); //所有事情处理好后执行mounted函数
}

Vue.prototype = {
	proxyKeys: function (key) {
		var self = this;
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get: function () {
				return self.data[key];
			},
			set: function (newVal) {
				self.data[key] = newVal;
			},
		});
	},
};