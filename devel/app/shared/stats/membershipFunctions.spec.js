///<reference path="../../../../main.d.ts" />
describe('Membership Function', function () {
    var $scope;
    beforeEach(angular.mock.module('visualisationsApp'));
    beforeEach(inject(function ($rootScope) {
        $scope = $rootScope.$new();
    }));
    afterEach(function () {
        $scope.$apply();
    });
    var compareFunctions = function (function1, function2) {
        expect(function1.name).toEqual(function2.name);
        expect(function1.upperStart).toEqual(function2.upperStart);
        expect(function1.upperEnd).toEqual(function2.upperEnd);
        expect(function1.upperTop1).toEqual(function2.upperTop1);
        expect(function1.upperTop2).toEqual(function2.upperTop2);
        expect(function1.lowerStart).toEqual(function2.lowerStart);
        expect(function1.lowerEnd).toEqual(function2.lowerEnd);
        expect(function1.lowerTop1).toEqual(function2.lowerTop1);
        expect(function1.lowerTop2).toEqual(function2.lowerTop2);
    };
    describe('Service', function () {
        var MembershipFunctions;
        var $httpBackend;
        beforeEach(inject(function ($injector) {
            MembershipFunctions = $injector.get('MembershipFunctions');
            $httpBackend = $injector.get('$httpBackend');
        }));
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        var mockEmptyStatistics;
        var mockEmptyMembershipFunctionProcessed;
        var mockFunction1;
        var mockFunction2;
        var mockFunction3;
        var mockFunctions;
        var mockComputedStatistics;
        var mockComputedNullStatistics;
        var mockProcessedFunction1;
        var mockProcessedFunction2;
        var mockProcessedFunction3;
        var mockProcessedFunctions;
        beforeEach(function () {
            mockEmptyStatistics = {
                minimum: 0,
                maximum: 0,
                range: 0
            };
            mockEmptyMembershipFunctionProcessed = {
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
            mockFunction1 = {
                name: "Low",
                lowerStart: 4000.0,
                lowerTop1: 4000.0,
                lowerTop2: 33600.0,
                lowerEnd: 43800.0,
                upperStart: 4000.0,
                upperTop1: 4000.0,
                upperTop2: 33600.0,
                upperEnd: 54000.0
            };
            mockFunction2 = {
                name: "Medium",
                lowerStart: 43800.0,
                lowerTop1: 54000.0,
                lowerTop2: 65000.0,
                lowerEnd: 79000.0,
                upperStart: 33600.0,
                upperTop1: 54000.0,
                upperTop2: 65000.0,
                upperEnd: 100997.14285714287
            };
            mockFunction3 = {
                name: "High",
                lowerStart: 79000.0,
                lowerTop1: 100997.14285714287,
                lowerTop2: 200000.0,
                lowerEnd: 200000.0,
                upperStart: 65000.0,
                upperTop1: 100997.14285714287,
                upperTop2: 200000.0,
                upperEnd: 200000.0
            };
            mockFunctions = [mockFunction1, mockFunction2, mockFunction3];
            mockComputedStatistics = {
                maximum: 200000,
                minimum: 4000,
                range: 196000
            };
            mockComputedNullStatistics = {
                maximum: 0,
                minimum: 0,
                range: 0
            };
            mockProcessedFunction1 = {
                name: "Low",
                lowerStart: 4000.0,
                lowerTop1: 4000.0,
                lowerTop2: 33600.0,
                lowerEnd: 43800.0,
                upperStart: 4000.0,
                upperTop1: 4000.0,
                upperTop2: 33600.0,
                upperEnd: 54000.0,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunction2 = {
                name: "Medium",
                lowerStart: 43800.0,
                lowerTop1: 54000.0,
                lowerTop2: 65000.0,
                lowerEnd: 79000.0,
                upperStart: 33600.0,
                upperTop1: 54000.0,
                upperTop2: 65000.0,
                upperEnd: 100997.14285714287,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunction3 = {
                name: "High",
                lowerStart: 79000.0,
                lowerTop1: 100997.14285714287,
                lowerTop2: 200000.0,
                lowerEnd: 200000.0,
                upperStart: 65000.0,
                upperTop1: 100997.14285714287,
                upperTop2: 200000.0,
                upperEnd: 200000.0,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunctions = [mockProcessedFunction1, mockProcessedFunction2, mockProcessedFunction3];
        });
        it('should be present.', function () {
            expect(MembershipFunctions).toBeDefined();
        });
        it('should create Empty statistics.', function () {
            var EmptyStatistics = MembershipFunctions.createEmptyStatistics();
            expect(EmptyStatistics).toEqual(mockEmptyStatistics);
        });
        it('should create Empty membership object.', function () {
            var EmptyMembershipFunction = MembershipFunctions.createEmptyMembershipFunctionProcessed();
            expect(EmptyMembershipFunction).toEqual(mockEmptyMembershipFunctionProcessed);
        });
        it('should compute statistics correctly.', function () {
            MembershipFunctions.computeAndSetStatistics(mockFunctions, mockEmptyStatistics);
            expect(mockEmptyStatistics).toEqual(mockComputedStatistics);
        });
        it('should compute statistics correctly. (null)', function () {
            MembershipFunctions.computeAndSetStatistics(null, mockEmptyStatistics);
            expect(mockEmptyStatistics).toEqual(mockComputedNullStatistics);
        });
        it('should compute statistics correctly. (undefined)', function () {
            MembershipFunctions.computeAndSetStatistics(undefined, mockEmptyStatistics);
            expect(mockEmptyStatistics).toEqual(mockComputedNullStatistics);
        });
        it('should compute statistics correctly. (null and undefined)', function () {
            try {
                MembershipFunctions.computeAndSetStatistics(mockFunctions, null);
                MembershipFunctions.computeAndSetStatistics(mockFunctions, undefined);
                expect(true).toBeTruthy();
            }
            catch (error) {
                expect(error).toBeUndefined();
            }
        });
        it('should remove selection from all functions.', function () {
            mockProcessedFunctions[0].isSelected = true;
            mockProcessedFunctions[1].isSelected = undefined;
            mockProcessedFunctions[2].isSelected = null;
            MembershipFunctions.removeSelectionFromAllFunctions(mockProcessedFunctions);
            expect(mockProcessedFunctions[0].isSelected).toEqual(false);
            expect(mockProcessedFunctions[1].isSelected).toEqual(false);
            expect(mockProcessedFunctions[2].isSelected).toEqual(false);
        });
        it('should process all functions.', function () {
            var processedMembershipFunctions = [];
            MembershipFunctions.processMembershipFunctions(mockFunctions, processedMembershipFunctions, mockEmptyStatistics);
            compareFunctions(processedMembershipFunctions[0], mockFunctions[0]);
            expect(processedMembershipFunctions[0].start).toEqual(0);
            expect(processedMembershipFunctions[0].middleOne).toEqual(0);
            expect(processedMembershipFunctions[0].middleTwo).toBeCloseTo(0.1510204081632653);
            expect(processedMembershipFunctions[0].end).toBeCloseTo(0.25510204081632654);
            expect(processedMembershipFunctions[0].isSelected).toEqual(false);
            compareFunctions(processedMembershipFunctions[1], mockFunctions[1]);
            expect(processedMembershipFunctions[1].start).toBeCloseTo(0.1510204081632653);
            expect(processedMembershipFunctions[1].middleOne).toBeCloseTo(0.25510204081632654);
            expect(processedMembershipFunctions[1].middleTwo).toBeCloseTo(0.3112244897959184);
            expect(processedMembershipFunctions[1].end).toBeCloseTo(0.49488338192419834);
            expect(processedMembershipFunctions[1].isSelected).toEqual(false);
            compareFunctions(processedMembershipFunctions[2], mockFunctions[2]);
            expect(processedMembershipFunctions[2].start).toBeCloseTo(0.3112244897959184);
            expect(processedMembershipFunctions[2].middleOne).toBeCloseTo(0.49488338192419834);
            expect(processedMembershipFunctions[2].middleTwo).toBeCloseTo(1);
            expect(processedMembershipFunctions[2].end).toBeCloseTo(1);
            expect(processedMembershipFunctions[2].isSelected).toEqual(false);
            expect(mockEmptyStatistics).toEqual(mockComputedStatistics);
        });
        it('should process all functions. (null)', function () {
            var processedMembershipFunctions = [];
            try {
                MembershipFunctions.processMembershipFunctions(null, null, null);
            }
            catch (error) {
                expect(error).not.toBeDefined(error);
            }
        });
        it('should set function as selected.', function () {
            mockProcessedFunction1.isSelected = false;
            var selected = MembershipFunctions.setFunctionSelected(mockProcessedFunction1);
            expect(selected).toEqual(true);
            expect(mockProcessedFunction1.isSelected).toEqual(true);
        });
        it('should set function as selected. (null)', function () {
            var selected = MembershipFunctions.setFunctionSelected(null);
            expect(selected).toEqual(false);
        });
        it('should set function as selected. (undefined)', function () {
            var selected = MembershipFunctions.setFunctionSelected(undefined);
            expect(selected).toEqual(false);
        });
        it('should return if the function is selected. (false)', function () {
            mockProcessedFunction1.isSelected = false;
            var selected = MembershipFunctions.isFunctionSelected(mockProcessedFunction1);
            expect(selected).toEqual(false);
        });
        it('should return if the function is selected. (true)', function () {
            mockProcessedFunction1.isSelected = true;
            var selected = MembershipFunctions.isFunctionSelected(mockProcessedFunction1);
            expect(selected).toEqual(true);
        });
        it('should return if the function is selected (null)', function () {
            var selected = MembershipFunctions.isFunctionSelected(null);
            expect(selected).toEqual(false);
        });
        it('should return if the function is selected (undefined)', function () {
            var selected = MembershipFunctions.isFunctionSelected(undefined);
            expect(selected).toEqual(false);
        });
        it('should return matched function', function () {
            var matchedFunction = MembershipFunctions.getMatchedMembershipFunction(mockProcessedFunction2, mockFunctions);
            expect(matchedFunction).toEqual(mockFunction2);
        });
        it('should return matched function (null provided)', function () {
            var matchedFunction = MembershipFunctions.getMatchedMembershipFunction(null, mockFunctions);
            expect(matchedFunction).toEqual(undefined);
        });
        it('should return matched function (undefined provided)', function () {
            var matchedFunction = MembershipFunctions.getMatchedMembershipFunction(undefined, mockFunctions);
            expect(matchedFunction).toEqual(undefined);
        });
        it('should return matched function (null as a set)', function () {
            var matchedFunction = MembershipFunctions.getMatchedMembershipFunction(mockProcessedFunction2, null);
            expect(matchedFunction).toEqual(undefined);
        });
        it('should return matched function (undefined as a set)', function () {
            var matchedFunction = MembershipFunctions.getMatchedMembershipFunction(mockProcessedFunction2, undefined);
            expect(matchedFunction).toEqual(undefined);
        });
    });
    describe('Components', function () {
        var $componentController;
        beforeEach(inject(function (_$componentController_) {
            $componentController = _$componentController_;
        }));
        var mockFunction1;
        var mockFunction2;
        var mockFunction3;
        var mockFunctions;
        var mockProcessedFunction1;
        var mockProcessedFunction2;
        var mockProcessedFunction3;
        var mockProcessedFunctions;
        var mockComputedStatistics;
        beforeEach(function () {
            mockFunction1 = {
                name: "Low",
                lowerStart: 4000.0,
                lowerTop1: 4000.0,
                lowerTop2: 33600.0,
                lowerEnd: 43800.0,
                upperStart: 4000.0,
                upperTop1: 4000.0,
                upperTop2: 33600.0,
                upperEnd: 54000.0
            };
            mockFunction2 = {
                name: "Medium",
                lowerStart: 43800.0,
                lowerTop1: 54000.0,
                lowerTop2: 65000.0,
                lowerEnd: 79000.0,
                upperStart: 33600.0,
                upperTop1: 54000.0,
                upperTop2: 65000.0,
                upperEnd: 100997.14285714287
            };
            mockFunction3 = {
                name: "High",
                lowerStart: 79000.0,
                lowerTop1: 100997.14285714287,
                lowerTop2: 200000.0,
                lowerEnd: 200000.0,
                upperStart: 65000.0,
                upperTop1: 100997.14285714287,
                upperTop2: 200000.0,
                upperEnd: 200000.0
            };
            mockFunctions = [mockFunction1, mockFunction2, mockFunction3];
            mockProcessedFunction1 = {
                name: "Low",
                lowerStart: 4000.0,
                lowerTop1: 4000.0,
                lowerTop2: 33600.0,
                lowerEnd: 43800.0,
                upperStart: 4000.0,
                upperTop1: 4000.0,
                upperTop2: 33600.0,
                upperEnd: 54000.0,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunction2 = {
                name: "Medium",
                lowerStart: 43800.0,
                lowerTop1: 54000.0,
                lowerTop2: 65000.0,
                lowerEnd: 79000.0,
                upperStart: 33600.0,
                upperTop1: 54000.0,
                upperTop2: 65000.0,
                upperEnd: 100997.14285714287,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunction3 = {
                name: "High",
                lowerStart: 79000.0,
                lowerTop1: 100997.14285714287,
                lowerTop2: 200000.0,
                lowerEnd: 200000.0,
                upperStart: 65000.0,
                upperTop1: 100997.14285714287,
                upperTop2: 200000.0,
                upperEnd: 200000.0,
                start: 0,
                middleOne: 0,
                middleTwo: 0,
                end: 0,
                isSelected: false
            };
            mockProcessedFunctions = [mockProcessedFunction1, mockProcessedFunction2, mockProcessedFunction3];
            mockComputedStatistics = {
                maximum: 200000,
                minimum: 4000,
                range: 196000
            };
        });
        it('should intialise component and compute all data and select right choice.', function () {
            // Here we are passing actual bindings to the component
            var selectedFuntion = undefined;
            var bindings = {
                membershipFunctions: mockFunctions,
                selectedFunction: selectedFuntion
            };
            var ctrl = $componentController('membershipFunctions', null, bindings);
            ctrl.init();
            expect(ctrl.membershipFunctions).toEqual(mockFunctions);
            compareFunctions(ctrl.processedMembershipFunctions[0], mockFunctions[0]);
            expect(ctrl.processedMembershipFunctions[0].start).toEqual(0);
            expect(ctrl.processedMembershipFunctions[0].middleOne).toEqual(0);
            expect(ctrl.processedMembershipFunctions[0].middleTwo).toBeCloseTo(0.1510204081632653);
            expect(ctrl.processedMembershipFunctions[0].end).toBeCloseTo(0.25510204081632654);
            expect(ctrl.processedMembershipFunctions[0].isSelected).toEqual(false);
            compareFunctions(ctrl.processedMembershipFunctions[1], mockFunctions[1]);
            expect(ctrl.processedMembershipFunctions[1].start).toBeCloseTo(0.1510204081632653);
            expect(ctrl.processedMembershipFunctions[1].middleOne).toBeCloseTo(0.25510204081632654);
            expect(ctrl.processedMembershipFunctions[1].middleTwo).toBeCloseTo(0.3112244897959184);
            expect(ctrl.processedMembershipFunctions[1].end).toBeCloseTo(0.49488338192419834);
            expect(ctrl.processedMembershipFunctions[1].isSelected).toEqual(false);
            compareFunctions(ctrl.processedMembershipFunctions[2], mockFunctions[2]);
            expect(ctrl.processedMembershipFunctions[2].start).toBeCloseTo(0.3112244897959184);
            expect(ctrl.processedMembershipFunctions[2].middleOne).toBeCloseTo(0.49488338192419834);
            expect(ctrl.processedMembershipFunctions[2].middleTwo).toBeCloseTo(1);
            expect(ctrl.processedMembershipFunctions[2].end).toBeCloseTo(1);
            expect(ctrl.processedMembershipFunctions[2].isSelected).toEqual(false);
            expect(ctrl.statistics).toEqual(mockComputedStatistics);
            ctrl.selectFunction(ctrl.processedMembershipFunctions[2]);
            expect(ctrl.selectedFunction).toEqual(mockFunction3);
            ctrl.selectFunction(ctrl.processedMembershipFunctions[0]);
            expect(ctrl.selectedFunction).toEqual(mockFunction1);
            expect(ctrl.isFunctionSelected(ctrl.processedMembershipFunctions[2])).toEqual(false);
            ctrl.selectFunction(ctrl.processedMembershipFunctions[1]);
            expect(ctrl.selectedFunction).toEqual(mockFunction2);
            ctrl.selectFunction(ctrl.processedMembershipFunctions[1]);
            expect(ctrl.selectedFunction).toEqual(undefined);
        });
    });
});
