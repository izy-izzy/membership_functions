///<reference path="../../../main.d.ts" />
var demo;
(function (demo) {
    'use strict';
    var demoModuleInject = ['$stateProvider'];
    demoModuleConfig.$inject = demoModuleInject;
    function demoModuleConfig($stateProvider) {
        $stateProvider
            .state('demo', {
            url: '/demo',
            component: 'demoComponent'
        });
    }
    angular
        .module('demo', [])
        .config(demoModuleConfig);
})(demo || (demo = {}));
