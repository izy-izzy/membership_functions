exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		'./devel/**/*.e2e.js'
	],
	frameworks: ['jasmine'],
	onPrepare: function() {
		let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter());
	},
	baseUrl:'http://localhost:8080',
	reporters: ['spec']
};