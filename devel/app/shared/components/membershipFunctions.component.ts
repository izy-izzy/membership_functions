///<reference path="../../../../main.d.ts" />

namespace shared {

	'use strict';

	class membershipFunctionsComponentController {

		static $inject: Array<string> = ['$scope', 'MembershipFunctions'];

		public membershipFunctions: IMembershipFunction[]; // Membership Functions pushed into this component
		public selectedFunction:IMembershipFunction; // selected Membership Function that is send as output of component
		public processedMembershipFunctions: IMembershipFunctionProcessed[]; // membership functions that are already processed
		public statistics: IMembershipFunctionStatistics; // statistics of the currently showing membership functions

		constructor(private $scope, private MembershipFunctions:IMembershipFunctionsService) {
			this.init();
		}

		/**
		 * Returns whether the passed function is selected.
		 * @param {IMembershipFunctionProcessed} membershipFunction 
		 * @returns {boolean} 
		 * @memberOf membershipFunctionsComponentController
		 */
		public isFunctionSelected(membershipFunction: IMembershipFunctionProcessed):boolean{
			return this.MembershipFunctions.isFunctionSelected(membershipFunction);
		}

		/**
		 * Passed function will be selected and all other function will be unselected.
		 * @param {IMembershipFunctionProcessed} membershipFunction 
		 * @memberOf membershipFunctionsComponentController
		 */
		public selectFunction(membershipFunction: IMembershipFunctionProcessed):void{
			if (this.isFunctionSelected(membershipFunction)){
				this.MembershipFunctions.removeSelectionFromAllFunctions(this.processedMembershipFunctions);
				this.setSelectedFunctionForOutput(undefined);
			} else {
				this.MembershipFunctions.removeSelectionFromAllFunctions(this.processedMembershipFunctions);
				this.MembershipFunctions.setFunctionSelected(membershipFunction);
				this.setSelectedFunctionForOutput(membershipFunction);
			}
		}

		/**
		 * Initialisation of the Controller.
		 * @private
		 * @memberOf membershipFunctionsComponentController
		 */
		private init():void{
			this.processedMembershipFunctions = [];
			this.statistics = this.MembershipFunctions.createEmptyStatistics();
			this.MembershipFunctions.processMembershipFunctions(this.membershipFunctions, this.processedMembershipFunctions, this.statistics);
			this.initialiseWatches();
		}

		/**
		 * Set function to be as an output.
		 * @private
		 * @param {IMembershipFunctionProcessed} membershipFunction 
		 * @memberOf membershipFunctionsComponentController
		 */
		private setSelectedFunctionForOutput(membershipFunction: IMembershipFunctionProcessed):void{
			if (angular.isDefined(membershipFunction) && (membershipFunction !== null)){
				this.selectedFunction = this.MembershipFunctions.getMatchedMembershipFunction(membershipFunction,this.membershipFunctions);
			} else {
				this.selectedFunction = undefined;
			}
		}

		/**
		 * Initialise watcher to get new membership functions. 
		 * This is required to be able to animate even if the membership functions on input completely changes.
		 * @private
		 * @memberOf membershipFunctionsComponentController
		 */
		private initialiseWatches():void{
			this.$scope.$watch(() => this.membershipFunctions, (newMembershipFunctions: IMembershipFunction[], oldMembershipFunctions: IMembershipFunction[]) => {
				if (newMembershipFunctions !== oldMembershipFunctions) { 
					this.MembershipFunctions.processMembershipFunctions(newMembershipFunctions, this.processedMembershipFunctions, this.statistics); 
				}
				this.setSelectedFunctionForOutput(undefined);
			}, true);
		}
	}

	class membershipFunctionsComponent {

		public bindings: any;
		public controller: any;
		public controllerAs: any;
		public templateUrl: string;

		constructor() {
			this.bindings = {
				membershipFunctions: "=",
				selectedFunction: '='
			};
			this.controller = membershipFunctionsComponentController;
			this.controllerAs = 'membershipFunctionController';
			this.templateUrl = '/templates/shared/views/membershipFunctions.component.html';
		}
	}

	angular
		.module('shared')
		.component('membershipFunctions', new membershipFunctionsComponent());
	
};
