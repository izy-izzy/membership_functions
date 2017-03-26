///<reference path="../../../../main.d.ts" />

declare interface IAPI {

	membershipFunctions:[
		{query(): angular.resource.IResourceArray<IMembershipFunction>;},
		{query(): angular.resource.IResourceArray<IMembershipFunction>;},
		{query(): angular.resource.IResourceArray<IMembershipFunction>;},
		{query(): angular.resource.IResourceArray<IMembershipFunction>;},
		{query(): angular.resource.IResourceArray<IMembershipFunction>;}	
	]
}

(function(){

	'use strict';

	class Api implements IAPI {

		private apiDomain = 'http://www.mocky.io/v2/';

		public membershipFunctions;

		static $inject = ['$resource'];

		constructor(private $resource: angular.resource.IResourceService) {

			this.membershipFunctions = [
				$resource(this.apiDomain + '58d439bd1000004c0fd7a721', null, {}),
				$resource(this.apiDomain + '58d7bde60f00001d06dcc5f9', null, {}),
				$resource(this.apiDomain + '58d7c46c0f0000e106dcc5fe', null, {}),
				$resource(this.apiDomain + '58d6aa6e100000b10b949d0e', null, {}), // []
				$resource(this.apiDomain + '58d6ab72100000c80b949d0f', null, {})  // ERROR
			]
		}
	}

	angular
		.module('shared')
		.service('API', Api);
})();
