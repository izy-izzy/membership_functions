///<reference path="../../../../main.d.ts" />
var demo;
(function (demo) {
    'use strict';
    var demoController = (function () {
        function demoController(DemoService) {
            this.DemoService = DemoService;
            this.subscribeForData();
            this.loadDataset(0);
        }
        /**
         * Register at service to get updates.
         * @private
         * @memberOf demoController
         */
        demoController.prototype.subscribeForData = function () {
            var _this = this;
            this.DemoService.membershipFunctionsDataObservable.subscribe(function (membershipFunctions) {
                _this.membershipFunctionsData = membershipFunctions;
            });
            this.DemoService.demoLoadingError.subscribe(function (isErrorPresent) {
                _this.loadingDataFailed = isErrorPresent;
            });
            this.DemoService.isLoading.subscribe(function (isLoading) {
                _this.isLoading = isLoading;
            });
        };
        /**
         * Notify Service to load a new dataset.
         * @param {number} index
         * @memberOf demoController
         */
        demoController.prototype.loadDataset = function (index) {
            this.DemoService.loadMembershipFunctionsData(index);
        };
        demoController.$inject = ['DemoService'];
        return demoController;
    }());
    /**
     * Simple demo Component used for demo purposes of Membership Functions.
     * @class demoComponent
     */
    var demoComponent = (function () {
        function demoComponent() {
            this.bindings = {};
            this.controller = demoController;
            this.controllerAs = '$ctrl';
            this.templateUrl = '/templates/demo/views/demo.component.html';
        }
        return demoComponent;
    }());
    angular
        .module('demo')
        .component('demoComponent', new demoComponent());
})(demo || (demo = {}));
;
