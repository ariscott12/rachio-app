const React = require('react');
const Reflux = require('reflux');
const Api = require('../utils/api');
const Timer = require('./timer');
const Zones = require('./zones');
const ZoneStartStore = require('../stores/zone-start-store');
const utils = require('../utils/utils');


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange')
  	],
	getInitialState() {
		return {
			zones: this.props.zoneData,
			timer: false,
			active: false,
			totalTime: 0
		}
	},
	showTimer() {
		return <Timer secondsRemaining={this.state.timerDuration} />
	},
	componentDidMount() {
		this.zoneData = [];
	},
	// setAllZones() {
	// 	this.zoneData = [];
	// 	for (let i = 0; i < this.state.zones.length; i++) {
	// 		this.zoneData[i] = {
	// 			'id' : this.state.zones[i].id,
	// 			'duration' : 1,
	// 			'sortOrder': i + 1,
	// 			'active' : true
	// 		}
	// 	}
	// },
	onChange(event) {
		this.zoneData = [];
		this.setState({
			active: false,
		});
	},
	startActiveZones() {
		let data = {
			'zones' : this.zoneData
		}		
		this.setState({
			active: false,
			timer: false
		})
		ZoneStartStore.startZones(data);
	},
	// called when number selector is clicked in <Zone /> component
	// updates duration based on id passed in from component
	onUpdate(id,val) {
		let index = utils.findObj(this.zoneData, id);
		this.zoneData[index].duration = val;
  	},
  	// called when <Zone /> component is activated
  	onActivate(id,val) {
   		let index = utils.findObj(this.zoneData, id);
   		// if activated push it onto the array, otherwise remove it
   		if(index === -1) {
			this.zoneData.push({
				'id': id,
				'duration' : val,
				'sortOrder' : 1
			});
			this.setState({active: true})
		} else {
			this.zoneData.splice(index,1);
		}	
		if(this.zoneData.length === 0) {
			this.setState({active: false})
		}	
  	},
  	getTotalTime() {
  		let val = 0;
  		for (var i = 0; i < this.zoneData.length; i++) {
  			val += this.zoneData[i].duration;
  		}
  		return val;
  	},
  	renderWaterInfo() {
  		if(!this.state.active) {
  			return <p>There are no zones currently selected. Select a zone to set a watering time</p>
  		} else {
  			return <p>There are {this.zoneData.length} zones currently selected</p>
  		}
  	},
  	renderForm() {
  		return <div>
  			<h2>Watering Info</h2>
  			{this.renderWaterInfo()}
			<button className  = {this.state.active ? "active" : "not-active"} disabled= {!this.state.active} onClick={this.startActiveZones}>Start Zone</button>
		</div>
  	},
	renderZones() {
	    return this.state.zones.map(function(zones) {
	      	return <Zones onUpdate={this.onUpdate} onActivate = {this.onActivate} key = {zones.id} active= {this.state.active}  {...zones} />	
	   	}.bind(this));
  	},
	render() {
		return <div>
		 	<section className = "zone-wrapper">
				{this.renderZones()}
			</section>
			<section className = "zone-dashboard">
				{this.renderForm()}
			</section>
		</div>
	}
})