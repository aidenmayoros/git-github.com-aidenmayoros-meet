import { Component } from 'react';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.color = null;
		this.bgColor = null;
	}

	getStyle = () => {
		return {
			color: this.color,
			backgroundColor: this.bgColor,
			borderWidth: '2px',
			borderStyle: 'solid',
			fontWeight: 'bolder',
			borderRadius: '7px',
			borderColor: this.color,
			textAlign: 'center',
			fontSize: '12px',
			margin: '10px 0',
			padding: '10px',
		};
	};

	render() {
		return (
			<div className='Alert'>
				<p style={this.getStyle()}>{this.props.text}</p>
			</div>
		);
	}
}

class InfoAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'white';
		this.bgColor = '#ff9800';
	}
}

class ErrorAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'white';
		this.bgColor = 'rgb(255 0 0)';
	}
}

class WarningAlert extends Alert {
	constructor(props) {
		super(props);
		this.color = 'white';
		this.bgColor = '#ff9800';
	}
}

export { InfoAlert, ErrorAlert, WarningAlert };
