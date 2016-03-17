const React = require('react');
const Reflux = require('reflux');
const Api = require('../utils/api');
const Timer = require('./timer');
const NumberPicker = require('react-widgets/lib/NumberPicker');
const numberLocalizer = require('react-widgets/lib/localizers/simple-number');
const ZoneStartStore = require('../stores/zone-start-store');
numberLocalizer();


module.exports = React.createClass({
	mixins: [
	    // listens for any events that are coming from ZoneStore, 
	    // call onChange function when event triggered by store
	    Reflux.listenTo(ZoneStartStore, 'onStartSingle')
  	],
	getInitialState() {
		return {
			duration:1,
			timer: false,
			timerDuration: 0
		}
	},
	startZone() {
		// duration must be an integer
		let duration = parseInt(this.state.duration);
		let id = this.props.id;

		// Set timer back to false in case it's already running, set number picker back to 1
		this.setState({
			duration: 1,
			timer: false
		})

		// Make API put call, takes id and duration
		ZoneStartStore.startZone(id, duration);
	},
	onStartSingle(event,id,duration) {
		if(id === this.props.id) {	
			this.setState({
            	timer: true,
            	timerDuration: duration
        	});
		}
	},
	showTimer() {
		return <Timer secondsRemaining={this.state.timerDuration} />
	},
	handleChange(value) {
		this.setState({
        	duration: value
      	});
	},
	renderForm() {
   		return <div>
	   		 <NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
	   		 <button onClick={this.startZone}>Start Zone</button>
	   		 {this.state.timer ? this.showTimer() : null}
   		</div>
	},
	render() {
		return <div>
			<p>Zone Number { this.props.zoneNumber }</p>
			{this.renderForm()}
		</div>
	}
})