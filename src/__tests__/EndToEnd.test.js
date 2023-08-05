import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
	let browser;
	let page;
	beforeAll(async () => {
		browser = await puppeteer.launch({
			headless: true, // Change to false to see the tests in action
			slowMo: 0, // Change the speed of the test, slow 250 to see tests in action
			timeout: 0,
		});
		page = await browser.newPage();
		await page.goto('http://localhost:3000/');
		await page.waitForSelector('.event');
	});

	afterAll(() => {
		browser.close();
	});

	test('An event element is collapsed by default', async () => {
		await page.waitForSelector('.event');

		const eventDetails = await page.$('.event .event-description');
		expect(eventDetails).toBeNull();
	});

	test('User can expand an event to see its details', async () => {
		await page.waitForSelector('.event');
		await page.click('.event .event-details-btn');

		const eventDetails = await page.$('.event .event-description');
		expect(eventDetails).toBeDefined();
	});

	test('User can collapse an event to hide details', async () => {
		await page.click('.event .event-details-btn');
		const eventDetails = await page.$('.event .event-description');
		expect(eventDetails).toBeNull();
	});
});
