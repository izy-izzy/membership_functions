///<reference path="../../../../main.d.ts" />

/**
 * Handles comunication with API to all Requests for a demo component.
 * @interface IDemoService
 */
declare interface IDemoService {

	/**
	 * Initialise call to API to get all data
	 * When data are received all observables are updated of the result.
	 * @param {number} index 
	 * @memberOf IDemoService
	 */
	loadMembershipFunctionsData(index: number): void;
	

	/**
	 * Used for RXJS communication.
	 */
	isLoading: any; // indicates if the service is loading
	membershipFunctionsDataObservable: any;  // the object that is sending/receiving loaded data
	demoLoadingError: any;  // indicates if there is an error during loading data
}

namespace demo {

	'use strict';

	class DemoService implements IDemoService {

		public membershipFunctionsData: IMembershipFunction[];
		public membershipFunctionsDataObservable: any;
		public demoLoadingError: any;
		public isLoading: any;

		static $inject: Array<string> = ['$q','API', 'rx'];
		constructor(private $q, private API:IAPI, private rx) {
			this.init()
		}

		/** 
		 * Creates all objects.
		 * @private
		 * @memberOf DemoService
		 */
		private init(){
			this.membershipFunctionsData = [];
			this.membershipFunctionsDataObservable = new this.rx.BehaviorSubject();
			this.demoLoadingError = new this.rx.BehaviorSubject();
			this.isLoading = new this.rx.BehaviorSubject();
		}

		public loadMembershipFunctionsData(index: number): void{
			this.isLoading.onNext(true);
			if (index >= 0){
				this.API.membershipFunctions[index].query()
					.$promise
					.then((resource: IMembershipFunction[]) => {
						this.membershipFunctionsData = resource;
						this.membershipFunctionsDataObservable.onNext(resource);
						this.demoLoadingError.onNext(false);
					}, (error) => {
						this.membershipFunctionsData = [];
						this.membershipFunctionsDataObservable.onNext([]);
						this.demoLoadingError.onNext(true);
					}).finally(() => {
						this.isLoading.onNext(false);
					})
			} else {
				this.isLoading.onNext(false);
				this.demoLoadingError.onNext(true);
				this.membershipFunctionsData = [];
				this.membershipFunctionsDataObservable.onNext(null);
				
			}
		}

	}

	angular
		.module('demo')
		.service('DemoService', DemoService);

}
