import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {
	let AppDOM;

	beforeEach(() => {
		AppDOM = render(<App />).container.firstChild;
	});

	test('renders list of events', () => {
		expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
	});

	test('renders <NumberofEvents /> component', () => {
		expect(AppDOM.querySelector('#number-of-events-textbox')).toBeInTheDocument();
	});

	test('renders CitySearch', () => {
		expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
	});
});
