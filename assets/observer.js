function Observer(data) {
	this.data = data;
	//遍历data
	this.walk(data);
}

Observer.prototype = {
	walk: function () {
		var self = this;
		Object.keys(data).forEach(function (key) {
			self.defineReactive(data, key, data[key]);
		})
	},
	defineReactive: function (data, key, val) {
		var dep = new Dep();
		//如果有嵌套则递归
		var childObj = observe(val);
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: function getter() {
				if (Dep.target) {
					dep.addSub(Dep.target);
				}
				return val;
			},
			set: function setter(newVal) {
				if (newVal === val) {
					return;
				}
				val = newVal;
				dep.notify();
			},
		});
	},
};

function observe(value, vm) {
	if (!value || typeof value !== 'object') {
		return;
	}
	return new Observer(value);
}

function Dep() {
	this.subs = [];//观察者列表
}

Dep.prototype = {
	addSub: function (sub) {
		this.subs.push(sub);
	},
	notify: function () {
		this.subs.forEach(function (sub) {
			sub.update();
		});
	},
};

Dep.target = null;