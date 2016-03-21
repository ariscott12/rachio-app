const React = require('react');
const Reflux = require('reflux');
const Api = require('../utils/api');
const Timer = require('./timer');
const Zones = require('./zones');
const WaterInfo = require('../components/water-info');
const ZonesAll = require('../components/zone-all');
const ZoneStartStore = require('../stores/zone-start-store');
const utils = require('../utils/utils');


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange'),
  	],
	getInitialState() {
		return {
			zones: this.props.zoneData,
			active: false,
		}
	},
	componentDidMount() {
		this.activeZones = 0;
	},
	onChange(event) {
		this.setState({
			active: false,
			loading: false
		});
	},
	onActivate() {
		this.activeZones =  ZoneStartStore.getActiveZones();
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
			loading: true
		});
		ZoneStartStore.startZones(data);
	},
  	zoneInfo() {
  		if(!this.state.active) {
  			return <p>There are no zones currently selected. Select a zone/zones to manually set watering times</p>
  		} else {
  			return <p>There are {this.activeZones} zones currently selected</p>
  		}
  	},
  	renderLoader() {
  		return <img className = "loader" src = "img/loader-2.gif" />
  	},
	renderZones() {
	    return this.state.zones.map(function(zones) {
	      	return <Zones key = {zones.id} onActivate = {this.onActivate} {...zones} />	
	   	}.bind(this));
  	},
	render() {
		return <div>
		 	<section className = "zone-wrapper app-panel">
		 		<h2 className = "bg-gray">My Yard {this.state.zones.length} Zones</h2>
		 		<div className = "app-panel-inner">
					{this.state.zones ? this.renderZones() : null}
				</div>
			</section>
			<section className = "zone-dashboard">
				<WaterInfo />
				<div className = "app-panel">
					<h2 className = "bg-gray">Start Individual Zones</h2>
					<div className = "app-panel-inner">
						{this.zoneInfo()}
						{this.state.loading ? this.renderLoader() : null}
						<button className  = {this.state.active ? "active" : "not-active"} disabled= {!this.state.active} onClick={this.startActiveZones}>Start Zones</button>
					</div>
				</div>
				<ZonesAll zones = {this.state.zones} />
			</section>
		</div>
	}
})