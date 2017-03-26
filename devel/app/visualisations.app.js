///<reference path="../../main.d.ts" />
(function () {
    'use strict';
    angular.module('visualisationsApp', [
        'ui.router',
        'ngResource',
        'ngAnimate',
        'rx',
        'shared',
        '720kb.tooltips',
        'demo'
    ]);
    var visualisationsAppInject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    visualisationsAppConfiguration.$inject = visualisationsAppInject;
    function visualisationsAppConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/demo");
    }
    angular.module('visualisationsApp').config(visualisationsAppConfiguration);
})();
