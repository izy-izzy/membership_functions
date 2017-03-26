///<reference path="../../../../main.d.ts" />

// RXJS does not have a good typescript file thus this is required.
interface TestableScheduler extends Rx.VirtualTimeScheduler<any,any>{
	scheduleAbsolute: Function;
}

describe('Demo', () => {

	let $scope;

	beforeEach(angular.mock.module('visualisationsApp'));

	beforeEach(inject(($rootScope) => {
		$scope = $rootScope.$new();
	}));

	afterEach(function() {
		$scope.$apply();
	});

	describe('Service', () => {

		let DemoService: IDemoService;
		let $httpBackend;

		beforeEach(inject(($injector) => {
			DemoService = $injector.get('DemoService');
			$httpBackend = $injector.get('$httpBackend');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should be present', () => {
			expect(DemoService).toBeDefined();
		});

		it('should try to call valid API (Data Set 0)', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58d439bd1000004c0fd7a721')
				.respond(200, {msg: 'ok'});

			DemoService.loadMembershipFunctionsData(0)

			$httpBackend.flush();
		});

		it('should try to call valid API (Data Set 1)', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58d7bde60f00001d06dcc5f9')
				.respond(200, {msg: 'ok'});

			DemoService.loadMembershipFunctionsData(1)

			$httpBackend.flush();
		});

		it('should try to call valid API (Data Set 2)', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58d7c46c0f0000e106dcc5fe')
				.respond(200, {msg: 'ok'});

			DemoService.loadMembershipFunctionsData(2)

			$httpBackend.flush();
		});

		it('should try to call valid API (Data Set 3)', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58d6aa6e100000b10b949d0e')
				.respond(200, {msg: 'ok'});

			DemoService.loadMembershipFunctionsData(3)

			$httpBackend.flush();
		});

		it('should try to call valid API (Data Set 4)', () => {
			$httpBackend.expectGET('http://www.mocky.io/v2/58d6ab72100000c80b949d0f')
				.respond(200, {msg: 'ok'});

			DemoService.loadMembershipFunctionsData(4)

			$httpBackend.flush();
		});

		it('Test whether the data is loading.', () => {
			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let data:IMembershipFunction;
			let isLoading: boolean;

			DemoService.membershipFunctionsDataObservable.subscribe((data) => {
				this.data = data;
			});

			DemoService.isLoading.subscribe((isLoading) => {
				this.isLoading = isLoading;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(data).toEqual(undefined);
				expect(this.isLoading).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				DemoService.loadMembershipFunctionsData(0);
			});

			castedScheduler.scheduleAbsolute(null, new Date(3), () => {
				expect(this.isLoading).toEqual(true);
				scheduler.stop();
			});

			scheduler.start();

		});

		it('Negative index testing.', () => {
			let scheduler:Rx.VirtualTimeScheduler<any,any> = new Rx.TestScheduler();
			let castedScheduler = <TestableScheduler>scheduler;
			let data:IMembershipFunction;
			let isLoading: boolean;

			DemoService.membershipFunctionsDataObservable.subscribe((data) => {
				this.data = data;
			});

			DemoService.isLoading.subscribe((isLoading) => {
				this.isLoading = isLoading;
			});

			castedScheduler.scheduleAbsolute(null, new Date(1), () => { 
				expect(this.data).toEqual(undefined);
				expect(this.isLoading).toEqual(undefined);
			});

			castedScheduler.scheduleAbsolute(null, new Date(2), () => { 
				DemoService.loadMembershipFunctionsData(-15);
			});

			castedScheduler.scheduleAbsolute(null, new Date(30), () => {
				expect(this.isLoading).toEqual(false);
				expect(this.data).toEqual(null);
				scheduler.stop();
			});

			scheduler.start();

		});

	});
});