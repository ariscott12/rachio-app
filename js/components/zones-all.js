const React = require('react');
const Reflux = require('reflux');
const Api = require('../utils/api');
const Timer = require('./timer');
const Zones = require('./zones');



module.exports = React.createClass({
	mixins: [
	    // listens for any events that are coming from ZoneStore, 
	    // call onChange function when event triggered by store
	  //  Reflux.listenTo(ZoneStartStore, 'onStartSingle')
  	],
	getInitialState() {
		return {
			zones: this.props.zoneData
		}
	},
	showTimer() {
		return <Timer secondsRemaining={this.state.timerDuration} />
	},
	componentDidMount() {
		this.zoneData = [];
	},
	setAllZones() {
		this.zoneData = [];
		for (let i = 0; i < this.state.zones.length; i++) {
			this.zoneData[i] = {
				'id' : this.state.zones[i].id,
				'duration' : 1,
				'sortOrder': i + 1,
				'active' : true
			}
		}
	},
	findObj(id) {
		return this.zoneData.map(function(x) {
			return x.id; 
		}).indexOf(id);
	},
	onUpdate(id,val) {
		let index = this.findObj(id);
		this.zoneData[index].duration = val;	
  	},
  	onActivate(id,val) {
   		let index = this.findObj(id);
   		if(index === -1) {
			this.zoneData.push({
				'id': id,
				'duration' : val,
				'sortOrder' : 1
			})
		} else {
			this.zoneData.splice(index,1);
		}		
  	},
	renderZones() {
	    return this.state.zones.map(function(zones) {
	      	return <Zones onUpdate={this.onUpdate} onActivate = {this.onActivate} key = {zones.id}  {...zones} />	
	   	}.bind(this));
  	},
	render() {
		return <div>
			<p>Start Zones</p>
			{this.renderZones()}
		</div>
	}
})