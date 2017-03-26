describe('Demo module', () => {

	it('Should be able to access demo page and select a function.', () => {
		
		var EC = protractor.ExpectedConditions;

		browser.get('http://localhost:8080/demo');
		browser.waitForAngular();	

		expect(element(by.css('h1')).getText()).toEqual('Demo');
		expect(element(by.css('h2')).getText()).toEqual('Membership functions');

		expect(element.all(by.css('.function')).get(0).click());

		let name = element.all(by.css('.function .name')).get(0).getText();
		expect(element(by.css('[e2e="selectedFunction"]')).getText()).toEqual(name);
		
	});
});