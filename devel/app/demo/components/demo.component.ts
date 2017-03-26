///<reference path="../../../../main.d.ts" />

namespace demo {

	'use strict';

	class demoController {

		static $inject: Array<string> = ['DemoService'];

		public membershipFunctionsData: IMembershipFunction[]; // loaded membership functions data 
		public membershipFunctionsSelectedData: IMembershipFunction; // selected membership functions data 
		public isLoading: boolean; // component is loading
		public loadingDataFailed: boolean; // loading of data failed

		constructor(private DemoService:IDemoService) {
			this.subscribeForData();
			this.loadDataset(0);
		}

		/**
		 * Register at service to get updates.
		 * @private
		 * @memberOf demoController
		 */
		private subscribeForData(){
			this.DemoService.membershipFunctionsDataObservable.subscribe((membershipFunctions:IMembershipFunction[]) => {
				this.membershipFunctionsData = membershipFunctions;
			});
			this.DemoService.demoLoadingError.subscribe((isErrorPresent:boolean) => {
				this.loadingDataFailed = isErrorPresent;
			});
			this.DemoService.isLoading.subscribe((isLoading:boolean) => {
				this.isLoading = isLoading;
			});
		}

		/**
		 * Notify Service to load a new dataset.
		 * @param {number} index 
		 * @memberOf demoController
		 */
		public loadDataset(index:number):void{
			this.DemoService.loadMembershipFunctionsData(index);
		}
	}

	/**
	 * Simple demo Component used for demo purposes of Membership Functions.
	 * @class demoComponent
	 */
	class demoComponent {

		public bindings: any;
		public controller: any;
		public controllerAs: any;
		public templateUrl: string;

		constructor() {
			this.bindings = {};
			this.controller = demoController;
			this.controllerAs = '$ctrl';
			this.templateUrl = '/templates/demo/views/demo.component.html';
		}
	}

	angular
		.module('demo')
		.component('demoComponent', new demoComponent());
	
};
