///<reference path="../../../../main.d.ts" />
var _this = this;
describe('Demo', function () {
    var $scope;
    beforeEach(angular.mock.module('visualisationsApp'));
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    afterEach(function () {
        $scope.$apply();
    });
    describe('Service', function () {
        var DemoService;
        var $httpBackend;
        beforeEach(inject(function ($injector) {
            DemoService = $injector.get('DemoService');
            $httpBackend = $injector.get('$httpBackend');
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('should be present', function () {
            expect(DemoService).toBeDefined();
        });
        it('should try to call valid API (Data Set 0)', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58d439bd1000004c0fd7a721')
                .respond(200, { msg: 'ok' });
            DemoService.loadMembershipFunctionsData(0);
            $httpBackend.flush();
        });
        it('should try to call valid API (Data Set 1)', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58d7bde60f00001d06dcc5f9')
                .respond(200, { msg: 'ok' });
            DemoService.loadMembershipFunctionsData(1);
            $httpBackend.flush();
        });
        it('should try to call valid API (Data Set 2)', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58d7c46c0f0000e106dcc5fe')
                .respond(200, { msg: 'ok' });
            DemoService.loadMembershipFunctionsData(2);
            $httpBackend.flush();
        });
        it('should try to call valid API (Data Set 3)', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58d6aa6e100000b10b949d0e')
                .respond(200, { msg: 'ok' });
            DemoService.loadMembershipFunctionsData(3);
            $httpBackend.flush();
        });
        it('should try to call valid API (Data Set 4)', function () {
            $httpBackend.expectGET('http://www.mocky.io/v2/58d6ab72100000c80b949d0f')
                .respond(200, { msg: 'ok' });
            DemoService.loadMembershipFunctionsData(4);
            $httpBackend.flush();
        });
        it('Test whether the data is loading.', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var data;
            var isLoading;
            DemoService.membershipFunctionsDataObservable.subscribe(function (data) {
                _this.data = data;
            });
            DemoService.isLoading.subscribe(function (isLoading) {
                _this.isLoading = isLoading;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(data).toEqual(undefined);
                expect(_this.isLoading).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                DemoService.loadMembershipFunctionsData(0);
            });
            castedScheduler.scheduleAbsolute(null, new Date(3), function () {
                expect(_this.isLoading).toEqual(true);
                scheduler.stop();
            });
            scheduler.start();
        });
        it('Negative index testing.', function () {
            var scheduler = new Rx.TestScheduler();
            var castedScheduler = scheduler;
            var data;
            var isLoading;
            DemoService.membershipFunctionsDataObservable.subscribe(function (data) {
                _this.data = data;
            });
            DemoService.isLoading.subscribe(function (isLoading) {
                _this.isLoading = isLoading;
            });
            castedScheduler.scheduleAbsolute(null, new Date(1), function () {
                expect(_this.data).toEqual(undefined);
                expect(_this.isLoading).toEqual(undefined);
            });
            castedScheduler.scheduleAbsolute(null, new Date(2), function () {
                DemoService.loadMembershipFunctionsData(-15);
            });
            castedScheduler.scheduleAbsolute(null, new Date(30), function () {
                expect(_this.isLoading).toEqual(false);
                expect(_this.data).toEqual(null);
                scheduler.stop();
            });
            scheduler.start();
        });
    });
});
