const React = require('react');
const Reflux = require('reflux');
const Timer = require('./timer');
const ZoneStartStore = require('../stores/zone-start-store');
const utils = require('../utils/utils');

module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange'),
  	],
	getInitialState() {
		return {
			timer: false,
			loading: false,
			time: 0
		}
	},
	onChange(event, time) {
		this.setState({
			timer: true,
			loading: false,
			time: time
		});
	},
	startActiveZones() {		
		this.totalTime = ZoneStartStore.getTotalTime();
	},
	clearTimer() {
		this.setState({
			timer: false
		});
	},
  	renderTimer() {
  		let time = this.state.time;
		return <div>
			<p>Manual Schedule Started for a total duration of { time / 60 } minutes</p>
			<Timer clear={this.clearTimer} secondsRemaining={time} />
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