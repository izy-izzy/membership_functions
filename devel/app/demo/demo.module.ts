///<reference path="../../../main.d.ts" />

module demo {
	
	'use strict';

	var demoModuleInject : Array<string> = ['$stateProvider'];
	demoModuleConfig.$inject = demoModuleInject;

	function demoModuleConfig($stateProvider) {
		$stateProvider
			.state('demo', { 
				url: '/demo',
				component: 'demoComponent'
			});
	}

	angular
		.module('demo', [])
		.config(demoModuleConfig);
}
