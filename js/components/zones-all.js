const React = require('react');
const Reflux = require('reflux');
const Api = require('../utils/api');
const Timer = require('./timer');
const Zones = require('./zones');
const ZoneStartStore = require('../stores/zone-start-store');
const utils = require('../utils/utils');


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange'),
  	],
	getInitialState() {
		return {
			zones: this.props.zoneData,
			timer: false,
			active: false,
			loading: false
		}
	},
	componentDidMount() {
		this.activeZones = 0;
		this.totalTime = 0;
	},
	onChange(event) {
		this.setState({
			active: false,
			timer: true,
			loading: false
		});
	},
	onActivate() {
		this.activeZones = ZoneStartStore.getActiveZones();
		 if(this.activeZones == 0) {
      		this.setState({active: false})
	    } else {
	      	this.setState({active: true})
	    }

	},
	startActiveZones() {
		let data = {
			'zones' : this.zoneData
		}		
		this.setState({
			timer: false,
			loading: true
		})
		this.totalTime = ZoneStartStore.getTotalTime();
		ZoneStartStore.startZones(data);
	},
  	renderTimer() {
		return <div>
			<p>Manual Schedule Started for a total duration of {this.totalTime / 60} minutes</p>
			<Timer secondsRemaining={this.totalTime} />
		</div>
	},
  	renderWaterInfo() {
  		if(!this.state.active) {
  			return <p>There are no zones currently selected. Select zones to manually set watering times</p>
  		} else {
  			return <p>There are {this.activeZones} zones currently selected</p>
  		}
  	},
  	renderLoader() {
  		return <h3>Loading!</h3>
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
				<h2>Watering Info</h2>
				{this.renderWaterInfo()}
				{this.state.loading ? this.renderLoader() : null}
				{this.state.timer ? this.renderTimer() : null}
				<button className  = {this.state.active ? "active" : "not-active"} disabled= {!this.state.active} onClick={this.startActiveZones}>Start Zones</button>
			</section>
		</div>
	}
})