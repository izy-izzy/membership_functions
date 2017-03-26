///<reference path="../../../../main.d.ts" />

declare interface IMembershipFunctionsService {
	/**
	 * Returns empty statistics that is filled with zeros.
	 * @returns {IMembershipFunctionStatistics} 
	 * @memberOf IMembershipFunctionsService
	 */
	createEmptyStatistics():IMembershipFunctionStatistics;
	
	/**
	 * Creates Empty processed membership function. Name is empty, all values are set to 0 and this membership function is not selected.
	 * @returns {IMembershipFunctionProcessed} 
	 * @memberOf IMembershipFunctionsService
	 */
	createEmptyMembershipFunctionProcessed(): IMembershipFunctionProcessed;

	/**
	 * Computes all statistics from membership functions. These statistics are also set. 
	 * @param {IMembershipFunction[]} membershipfunctions 
	 * @param {IMembershipFunctionStatistics} statistics 
	 * @memberOf IMembershipFunctionsService
	 */
	computeAndSetStatistics(membershipfunctions:IMembershipFunction[], statistics:IMembershipFunctionStatistics): void;

	/**
	 * Removes selection tag from all functions.
	 * @param {IMembershipFunctionProcessed[]} processedMembershipFunctions 
	 * @memberOf IMembershipFunctionsService
	 */
	removeSelectionFromAllFunctions(processedMembershipFunctions: IMembershipFunctionProcessed[]):void;

	/**
	 * Processes all membership functions to processed membership functions. 
	 * Also updates the statistics.
	 * @param {IMembershipFunction[]} membershipfunctions 
	 * @param {IMembershipFunctionProcessed[]} processedMembershipFunctions 
	 * @param {IMembershipFunctionStatistics} statistics 
	 * @memberOf IMembershipFunctionsService
	 */
	processMembershipFunctions(membershipfunctions:IMembershipFunction[], processedMembershipFunctions: IMembershipFunctionProcessed[], statistics:IMembershipFunctionStatistics):void;

	/**
	 * Returns whether the membership function is selected.
	 * @param {IMembershipFunctionProcessed} membershipFunction 
	 * @returns {boolean} 
	 * @memberOf IMembershipFunctionsService
	 */
	isFunctionSelected(membershipFunction: IMembershipFunctionProcessed): boolean;

	/**
	 * Set CurrentFunction as selected.
	 * @param {IMembershipFunctionProcessed} membershipFunction 
	 * @returns {boolean} 
	 * @memberOf IMembershipFunctionsService
	 */
	setFunctionSelected(membershipFunction:IMembershipFunctionProcessed): boolean;

	/**
	 * Returns membership function that has the same name as the processed one.
	 * @param {IMembershipFunctionProcessed} membershipFunctionProcessed 
	 * @param {IMembershipFunction[]} membershipFunctions 
	 * @returns {IMembershipFunction} 
	 * @memberOf IMembershipFunctionsService
	 */
	getMatchedMembershipFunction(membershipFunctionProcessed:IMembershipFunctionProcessed, membershipFunctions: IMembershipFunction[]): IMembershipFunction;
}

namespace demo {

	'use strict';

	class MembershipFunctions implements IMembershipFunctionsService {

		static $inject: Array<string> = [];

		constructor() {}

		public createEmptyStatistics():IMembershipFunctionStatistics{
			var statistics: IMembershipFunctionStatistics = {
				minimum : 0,
				maximum : 0,
				range: 0
			}
			return statistics;
		}

		public createEmptyMembershipFunctionProcessed(): IMembershipFunctionProcessed{
			let emptyProcessedObject : IMembershipFunctionProcessed = {
				start : 0,
				middleOne : 0,
				middleTwo : 0,
				end : 0,
				name : '',
				isSelected : false,
				lowerEnd: 0,
				lowerStart: 0,
				lowerTop1: 0,
				lowerTop2: 0,
				upperEnd: 0,
				upperStart: 0,
				upperTop1: 0,
				upperTop2: 0
			};
			return emptyProcessedObject;
		}

		public computeAndSetStatistics(membershipfunctions:IMembershipFunction[], statistics:IMembershipFunctionStatistics): void{
			if (angular.isDefined(membershipfunctions) && (membershipfunctions !== null)){
				let minMax:[number,number] = this.computeMinMax(membershipfunctions);
				if (!angular.isDefined(statistics) || (statistics === null)){
					statistics = this.createEmptyStatistics();
				}
				statistics.minimum = minMax[0];
				statistics.maximum = minMax[1];
				statistics.range = minMax[1] - minMax[0];
			} 
		}

		public removeSelectionFromAllFunctions(processedMembershipFunctions: IMembershipFunctionProcessed[]):void{
			processedMembershipFunctions.forEach((processedFunction) => {
				processedFunction.isSelected = false;
			});
		}

		public processMembershipFunctions(membershipfunctions:IMembershipFunction[], processedMembershipFunctions: IMembershipFunctionProcessed[], statistics:IMembershipFunctionStatistics):void{
			if (this.isValid(membershipfunctions)){
				this.computeAndSetStatistics(membershipfunctions, statistics);
				// Overwrite old objects
				membershipfunctions.forEach((object:IMembershipFunction, index:number) => {
					this.setMembershipFunctionAtIndex(object,processedMembershipFunctions,index,statistics);
				});
				// Remove unused objects at the end of the array
				var from = membershipfunctions.length;
				var to = processedMembershipFunctions.length;
				for (var indexToRemove = from; indexToRemove < to; indexToRemove++){
					processedMembershipFunctions.pop();
				} 
			}
		}

		public isFunctionSelected(membershipFunction: IMembershipFunctionProcessed): boolean{
			return (this.isValid(membershipFunction)) ? membershipFunction.isSelected : false;
		}

		public setFunctionSelected(membershipFunction:IMembershipFunctionProcessed): boolean{
			if (this.isValid(membershipFunction)){
				membershipFunction.isSelected = true;
				return this.isFunctionSelected(membershipFunction);
			} else {
				return false;
			}
		}

		public getMatchedMembershipFunction(membershipFunctionProcessed:IMembershipFunctionProcessed, membershipFunctions: IMembershipFunction[]): IMembershipFunction{
			if (this.isValid(membershipFunctionProcessed) && this.isValid(membershipFunctions) && Array.isArray(membershipFunctions)){
				let filteredSelection = membershipFunctions.filter((processedFunction:IMembershipFunction) => {
					return membershipFunctionProcessed.name === processedFunction.name;
				});

				return (filteredSelection.length > 0) ? filteredSelection[0] : undefined;
			}
		}

		/**
		 * Returns if the object is defined and not null.
		 * @private
		 * @param {any} object 
		 * @returns {boolean} 
		 * @memberOf MembershipFunctions
		 */
		private isValid(object): boolean{
			return angular.isDefined(object) && (object !== null);
		}

		/**
		 * At given index writes a new processed function.
		 * @private
		 * @param {IMembershipFunction} membershipFunction 
		 * @param {IMembershipFunctionProcessed[]} processedMembershipFunctions 
		 * @param {number} index 
		 * @param {IMembershipFunctionStatistics} statistics 
		 * @memberOf MembershipFunctions
		 */
		private setMembershipFunctionAtIndex(membershipFunction:IMembershipFunction, processedMembershipFunctions:IMembershipFunctionProcessed[], index:number, statistics: IMembershipFunctionStatistics){
			if (!angular.isDefined(processedMembershipFunctions[index])){
				processedMembershipFunctions[index] = this.createEmptyMembershipFunctionProcessed();
			}

			processedMembershipFunctions[index].name = membershipFunction.name;

			processedMembershipFunctions[index].isSelected = false;

			processedMembershipFunctions[index].start = (membershipFunction.upperStart - statistics.minimum) / statistics.range;
			processedMembershipFunctions[index].end = (membershipFunction.upperEnd - statistics.minimum) / statistics.range;
			
			processedMembershipFunctions[index].middleOne = (membershipFunction.upperTop1 - statistics.minimum) / statistics.range;
			processedMembershipFunctions[index].middleTwo = (membershipFunction.upperTop2 - statistics.minimum) / statistics.range;

			processedMembershipFunctions[index].lowerEnd = membershipFunction.lowerEnd;
			processedMembershipFunctions[index].lowerStart = membershipFunction.lowerStart;
			processedMembershipFunctions[index].lowerTop1 = membershipFunction.lowerTop1;
			processedMembershipFunctions[index].lowerTop2 = membershipFunction.lowerTop2;

			processedMembershipFunctions[index].upperStart = membershipFunction.upperStart;
			processedMembershipFunctions[index].upperEnd = membershipFunction.upperEnd;
			processedMembershipFunctions[index].upperTop1 = membershipFunction.upperTop1;
			processedMembershipFunctions[index].upperTop2 = membershipFunction.upperTop2;

		}

		/**
		 * Computes maximum and minumum value from given array of membership functions.
		 * Takes into account only 'upper' values.
		 * @private
		 * @param {IMembershipFunction[]} membershipFunctions 
		 * @returns {[number,number]} 
		 * @memberOf MembershipFunctions
		 */
		private computeMinMax(membershipFunctions:IMembershipFunction[]): [number,number]{
			let max = -9007199254740991; // MIN_SAFE_INTEGER (not supported by IE, explicit value needed)
			let min = 9007199254740991; // MAX_SAFE_INTEGER (not supported by IE, explicit value needed)
			membershipFunctions.forEach((membershipFunction:IMembershipFunction) => {
				max = Math.max(max, membershipFunction.upperEnd);
				max = Math.max(max, membershipFunction.upperStart);
				max = Math.max(max, membershipFunction.upperTop1);
				max = Math.max(max, membershipFunction.upperTop2);

				min = Math.min(min, membershipFunction.upperEnd);
				min = Math.min(min, membershipFunction.upperStart);
				min = Math.min(min, membershipFunction.upperTop1);
				min = Math.min(min, membershipFunction.upperTop2);
			});
			return [min,max];
		}


	}

	angular
		.module('shared')
		.service('MembershipFunctions', MembershipFunctions);

}
