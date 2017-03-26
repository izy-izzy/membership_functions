///<reference path="../../../../main.d.ts" />
(function () {
    'use strict';
    var Api = (function () {
        function Api($resource) {
            this.$resource = $resource;
            this.apiDomain = 'http://www.mocky.io/v2/';
            this.membershipFunctions = [
                $resource(this.apiDomain + '58d439bd1000004c0fd7a721', null, {}),
                $resource(this.apiDomain + '58d7bde60f00001d06dcc5f9', null, {}),
                $resource(this.apiDomain + '58d7c46c0f0000e106dcc5fe', null, {}),
                $resource(this.apiDomain + '58d6aa6e100000b10b949d0e', null, {}),
                $resource(this.apiDomain + '58d6ab72100000c80b949d0f', null, {}) // ERROR
            ];
        }
        Api.$inject = ['$resource'];
        return Api;
    }());
    angular
        .module('shared')
        .service('API', Api);
})();
