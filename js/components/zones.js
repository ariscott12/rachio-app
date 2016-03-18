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
			//timer: false,
			timerDuration: 0,
			active: false
		}
	},
	// startZone() {
	// 	// duration must be an integer
	// 	let duration = parseInt(this.state.duration);
	// 	let id = this.props.id;

	// 	// Set timer back to false in case it's already running, set number picker back to 1
	// 	this.setState({
	// 		duration: 1,
	// 		timer: false
	// 	})

	// 	// Make API put call, takes id and duration
	// 	ZoneStartStore.startSingleZone(id, duration);
	// },
	// onStartSingle(event,id,duration) {
	// 	if(id === this.props.id) {	
	// 		this.setState({
 //            	timer: true,
 //            	timerDuration: duration
 //        	});
	// 	}
	// },
	// showTimer() {
	// 	return <Timer secondsRemaining={this.state.timerDuration} />
	// },
	handleChange(value) {
		this.setState({
        	duration: value
      	});
      	if(this.state.active) {
      		this.props.onUpdate(this.props.id, value);
      	}
	},
	toggleActive() {
		if(this.state.active) {
			this.setState({
				active: false
			});
		} else {
			this.setState({
				active: true
			});
		}
		this.props.onActivate(this.props.id, this.state.duration);
		
		
	},
	renderForm() {
   		return <div>
	   		<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
	   		{this.state.timer ? this.showTimer() : null}
	   		<p>Set Time (mins)</p>
   		</div>
	},
	render() {
		return <div>
			<div onClick={this.toggleActive}>Zone Number { this.props.zoneNumber }</div>
			{ this.state.active ? this.renderForm() : null }
		</div>
	}
})