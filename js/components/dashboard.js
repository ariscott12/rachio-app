const React = require('react');
const Reflux = require('reflux');
const Zones = require('./zones');
const WaterInfo = require('../components/water-info');
const ZonesAll = require('../components/zone-all');
const ZoneStartStore = require('../stores/zone-start-store');

module.exports = React.createClass({
	mixins: [
		// listens for any events that are coming from ZoneStartStore, 
	    Reflux.listenTo(ZoneStartStore, 'onChange'),
  	],
	getInitialState() {
		return {
			zones: this.props.zoneData,
			active: false
		}
	},
	componentDidMount() {
		this.activeZones = 0;
	},
	// Triggered when API put is complete passes in total duration if needed
	onChange(event, time) {
		this.setState({
			active: false,
			loading: false
		});
	},
	onActivate() {
		// Gets number of active zones
		this.activeZones =  ZoneStartStore.getActiveZones();
		if(this.activeZones === 0) {
      		this.setState({active: false})
	    } else {
	      	this.setState({active: true})
	    }
	},
	startActiveZones() {
		this.setState({
			loading: true
		});
		// Start Watering for all active zones
		ZoneStartStore.startZones();
	},
  	zoneInfo() {
  		if(!this.state.active) {
  			return <p>There are no zones currently selected. Select zones to manually set watering times.</p>
  		} else {
  			// Update the text based on how many zones are selected
  			return <p>There {this.activeZones === 1 ? "is" : "are"} {this.activeZones} {this.activeZones === 1 ? "zone" : "zones"} currently selected</p>
  		}
  	},
  	renderLoader() {
  		return <img className = "loader" src = "img/loader-2.gif" />
  	},
  	// Render all zones for a persons yard
  	// Provides callback function to parent component when zone clicked
	renderZones() {
	    return this.state.zones.map((zones) => {
	      	return <Zones key = {zones.id} onActivate = {this.onActivate} {...zones} />	
	   	});
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