describe('Functions application', () => {

	it('should have a title', () => {
		browser.get('http://localhost:8080/');
		expect(browser.getTitle()).toEqual('Functions Application');
	});

});