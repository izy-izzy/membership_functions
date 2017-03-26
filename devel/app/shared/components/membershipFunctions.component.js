///<reference path="../../../../main.d.ts" />
var shared;
(function (shared) {
    'use strict';
    var membershipFunctionsComponentController = (function () {
        function membershipFunctionsComponentController($scope, MembershipFunctions) {
            this.$scope = $scope;
            this.MembershipFunctions = MembershipFunctions;
            this.init();
        }
        /**
         * Returns whether the passed function is selected.
         * @param {IMembershipFunctionProcessed} membershipFunction
         * @returns {boolean}
         * @memberOf membershipFunctionsComponentController
         */
        membershipFunctionsComponentController.prototype.isFunctionSelected = function (membershipFunction) {
            return this.MembershipFunctions.isFunctionSelected(membershipFunction);
        };
        /**
         * Passed function will be selected and all other function will be unselected.
         * @param {IMembershipFunctionProcessed} membershipFunction
         * @memberOf membershipFunctionsComponentController
         */
        membershipFunctionsComponentController.prototype.selectFunction = function (membershipFunction) {
            if (this.isFunctionSelected(membershipFunction)) {
                this.MembershipFunctions.removeSelectionFromAllFunctions(this.processedMembershipFunctions);
                this.setSelectedFunctionForOutput(undefined);
            }
            else {
                this.MembershipFunctions.removeSelectionFromAllFunctions(this.processedMembershipFunctions);
                this.MembershipFunctions.setFunctionSelected(membershipFunction);
                this.setSelectedFunctionForOutput(membershipFunction);
            }
        };
        /**
         * Initialisation of the Controller.
         * @private
         * @memberOf membershipFunctionsComponentController
         */
        membershipFunctionsComponentController.prototype.init = function () {
            this.processedMembershipFunctions = [];
            this.statistics = this.MembershipFunctions.createEmptyStatistics();
            this.MembershipFunctions.processMembershipFunctions(this.membershipFunctions, this.processedMembershipFunctions, this.statistics);
            this.initialiseWatches();
        };
        /**
         * Set function to be as an output.
         * @private
         * @param {IMembershipFunctionProcessed} membershipFunction
         * @memberOf membershipFunctionsComponentController
         */
        membershipFunctionsComponentController.prototype.setSelectedFunctionForOutput = function (membershipFunction) {
            if (angular.isDefined(membershipFunction) && (membershipFunction !== null)) {
                this.selectedFunction = this.MembershipFunctions.getMatchedMembershipFunction(membershipFunction, this.membershipFunctions);
            }
            else {
                this.selectedFunction = undefined;
            }
        };
        /**
         * Initialise watcher to get new membership functions.
         * This is required to be able to animate even if the membership functions on input completely changes.
         * @private
         * @memberOf membershipFunctionsComponentController
         */
        membershipFunctionsComponentController.prototype.initialiseWatches = function () {
            var _this = this;
            this.$scope.$watch(function () { return _this.membershipFunctions; }, function (newMembershipFunctions, oldMembershipFunctions) {
                if (newMembershipFunctions !== oldMembershipFunctions) {
                    _this.MembershipFunctions.processMembershipFunctions(newMembershipFunctions, _this.processedMembershipFunctions, _this.statistics);
                }
                _this.setSelectedFunctionForOutput(undefined);
            }, true);
        };
        membershipFunctionsComponentController.$inject = ['$scope', 'MembershipFunctions'];
        return membershipFunctionsComponentController;
    }());
    var membershipFunctionsComponent = (function () {
        function membershipFunctionsComponent() {
            this.bindings = {
                membershipFunctions: "=",
                selectedFunction: '='
            };
            this.controller = membershipFunctionsComponentController;
            this.controllerAs = 'membershipFunctionController';
            this.templateUrl = '/templates/shared/views/membershipFunctions.component.html';
        }
        return membershipFunctionsComponent;
    }());
    angular
        .module('shared')
        .component('membershipFunctions', new membershipFunctionsComponent());
})(shared || (shared = {}));
;
