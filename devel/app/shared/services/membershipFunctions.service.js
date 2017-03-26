///<reference path="../../../../main.d.ts" />
var demo;
(function (demo) {
    'use strict';
    var MembershipFunctions = (function () {
        function MembershipFunctions() {
        }
        MembershipFunctions.prototype.createEmptyStatistics = function () {
            var statistics = {
                minimum: 0,
                maximum: 0,
                range: 0
            };
            return statistics;
        };
        MembershipFunctions.prototype.createEmptyMembershipFunctionProcessed = function () {
            var emptyProcessedObject = {
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                name: '',
                isSelected: false,
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
        };
        MembershipFunctions.prototype.computeAndSetStatistics = function (membershipfunctions, statistics) {
            if (angular.isDefined(membershipfunctions) && (membershipfunctions !== null)) {
                var minMax = this.computeMinMax(membershipfunctions);
                if (!angular.isDefined(statistics) || (statistics === null)) {
                    statistics = this.createEmptyStatistics();
                }
                statistics.minimum = minMax[0];
                statistics.maximum = minMax[1];
                statistics.range = minMax[1] - minMax[0];
            }
        };
        MembershipFunctions.prototype.removeSelectionFromAllFunctions = function (processedMembershipFunctions) {
            processedMembershipFunctions.forEach(function (processedFunction) {
                processedFunction.isSelected = false;
            });
        };
        MembershipFunctions.prototype.processMembershipFunctions = function (membershipfunctions, processedMembershipFunctions, statistics) {
            var _this = this;
            if (this.isValid(membershipfunctions)) {
                this.computeAndSetStatistics(membershipfunctions, statistics);
                // Overwrite old objects
                membershipfunctions.forEach(function (object, index) {
                    _this.setMembershipFunctionAtIndex(object, processedMembershipFunctions, index, statistics);
                });
                // Remove unused objects at the end of the array
                var from = membershipfunctions.length;
                var to = processedMembershipFunctions.length;
                for (var indexToRemove = from; indexToRemove < to; indexToRemove++) {
                    processedMembershipFunctions.pop();
                }
            }
        };
        MembershipFunctions.prototype.isFunctionSelected = function (membershipFunction) {
            return (this.isValid(membershipFunction)) ? membershipFunction.isSelected : false;
        };
        MembershipFunctions.prototype.setFunctionSelected = function (membershipFunction) {
            if (this.isValid(membershipFunction)) {
                membershipFunction.isSelected = true;
                return this.isFunctionSelected(membershipFunction);
            }
            else {
                return false;
            }
        };
        MembershipFunctions.prototype.getMatchedMembershipFunction = function (membershipFunctionProcessed, membershipFunctions) {
            if (this.isValid(membershipFunctionProcessed) && this.isValid(membershipFunctions) && Array.isArray(membershipFunctions)) {
                var filteredSelection = membershipFunctions.filter(function (processedFunction) {
                    return membershipFunctionProcessed.name === processedFunction.name;
                });
                return (filteredSelection.length > 0) ? filteredSelection[0] : undefined;
            }
        };
        /**
         * Returns if the object is defined and not null.
         * @private
         * @param {any} object
         * @returns {boolean}
         * @memberOf MembershipFunctions
         */
        MembershipFunctions.prototype.isValid = function (object) {
            return angular.isDefined(object) && (object !== null);
        };
        /**
         * At given index writes a new processed function.
         * @private
         * @param {IMembershipFunction} membershipFunction
         * @param {IMembershipFunctionProcessed[]} processedMembershipFunctions
         * @param {number} index
         * @param {IMembershipFunctionStatistics} statistics
         * @memberOf MembershipFunctions
         */
        MembershipFunctions.prototype.setMembershipFunctionAtIndex = function (membershipFunction, processedMembershipFunctions, index, statistics) {
            if (!angular.isDefined(processedMembershipFunctions[index])) {
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
        };
        /**
         * Computes maximum and minumum value from given array of membership functions.
         * Takes into account only 'upper' values.
         * @private
         * @param {IMembershipFunction[]} membershipFunctions
         * @returns {[number,number]}
         * @memberOf MembershipFunctions
         */
        MembershipFunctions.prototype.computeMinMax = function (membershipFunctions) {
            var max = -9007199254740991; // MIN_SAFE_INTEGER (not supported by IE, explicit value needed)
            var min = 9007199254740991; // MAX_SAFE_INTEGER (not supported by IE, explicit value needed)
            membershipFunctions.forEach(function (membershipFunction) {
                max = Math.max(max, membershipFunction.upperEnd);
                max = Math.max(max, membershipFunction.upperStart);
                max = Math.max(max, membershipFunction.upperTop1);
                max = Math.max(max, membershipFunction.upperTop2);
                min = Math.min(min, membershipFunction.upperEnd);
                min = Math.min(min, membershipFunction.upperStart);
                min = Math.min(min, membershipFunction.upperTop1);
                min = Math.min(min, membershipFunction.upperTop2);
            });
            return [min, max];
        };
        MembershipFunctions.$inject = [];
        return MembershipFunctions;
    }());
    angular
        .module('shared')
        .service('MembershipFunctions', MembershipFunctions);
})(demo || (demo = {}));
