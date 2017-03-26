///<reference path="../../../../main.d.ts" />
var demo;
(function (demo) {
    'use strict';
    var DemoService = (function () {
        function DemoService($q, API, rx) {
            this.$q = $q;
            this.API = API;
            this.rx = rx;
            this.init();
        }
        /**
         * Creates all objects.
         * @private
         * @memberOf DemoService
         */
        DemoService.prototype.init = function () {
            this.membershipFunctionsData = [];
            this.membershipFunctionsDataObservable = new this.rx.BehaviorSubject();
            this.demoLoadingError = new this.rx.BehaviorSubject();
            this.isLoading = new this.rx.BehaviorSubject();
        };
        DemoService.prototype.loadMembershipFunctionsData = function (index) {
            var _this = this;
            this.isLoading.onNext(true);
            if (index >= 0) {
                this.API.membershipFunctions[index].query()
                    .$promise
                    .then(function (resource) {
                    _this.membershipFunctionsData = resource;
                    _this.membershipFunctionsDataObservable.onNext(resource);
                    _this.demoLoadingError.onNext(false);
                }, function (error) {
                    _this.membershipFunctionsData = [];
                    _this.membershipFunctionsDataObservable.onNext([]);
                    _this.demoLoadingError.onNext(true);
                }).finally(function () {
                    _this.isLoading.onNext(false);
                });
            }
            else {
                this.isLoading.onNext(false);
                this.demoLoadingError.onNext(true);
                this.membershipFunctionsData = [];
                this.membershipFunctionsDataObservable.onNext(null);
            }
        };
        DemoService.$inject = ['$q', 'API', 'rx'];
        return DemoService;
    }());
    angular
        .module('demo')
        .service('DemoService', DemoService);
})(demo || (demo = {}));
