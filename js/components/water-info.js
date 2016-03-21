const React = require('react');
const Reflux = require('reflux');
const Timer = require('./timer');
const ZoneStartStore = require('../stores/zone-start-store');

module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange'),
  	],
	getInitialState() {
		return {
			timer: false,
			loading: false,
			duration: 0
		}
	},
	// Triggered when API put is complete passes in total duration if needed
	onChange(event, duration) {
		this.clearTimer();
		this.setState({
			timer: true,
			loading: false,
			duration: duration
		});
	},
	// Callback function from <Timer /> component
	clearTimer() {
		this.setState({
			timer: false
		});
	},
	// Start the timer using component duration state
  	renderTimer() {
  		let duration = this.state.duration;
		return <div>
			<p>Manual Schedule Started for a total duration of <strong>{ duration / 60 } minutes</strong></p>
			<Timer clear={this.clearTimer} secondsRemaining={this.state.duration} />
		</div>
	},
  	renderMessage() {
  		if(!this.state.timer) {
  			return <p>There are no zones currently watering</p>
  		} else {
  			return null
  		}
  	},
  	renderLoader() {
  		return <img className = "loader" src = "img/loader-2.gif" />
  	},
	render() {
		return <div>
		 	<div className = "app-panel">
				<h2 className = "bg-blue">Watering Info</h2>
				<div className = "app-panel-inner">
					{this.renderMessage()}
					{this.state.timer ? this.renderTimer() : null}
				</div>
			</div>
		</div>
	}
})