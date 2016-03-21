const React = require('react');
const NumberPicker = require('react-widgets/lib/NumberPicker');
const numberLocalizer = require('react-widgets/lib/localizers/simple-number');
const Reflux = require('reflux');
const ZoneStartStore = require('../stores/zone-start-store');
const utils = require('../utils/utils');
numberLocalizer();


module.exports = React.createClass({
	mixins: [
	    Reflux.listenTo(ZoneStartStore, 'onChange')
  	],
  	getInitialState() {
		return {
			duration:1,
			loading:false
		}
	},
  	onChange(event) {
		this.setState({
			loading:false
		})
	},
	renderLoader() {
  		return <img className = "loader" src = "img/loader-2.gif" />
  	},
	
	startAllZones() {
		this.setState({
			loading:true
		})
		ZoneStartStore.startAllZones(this.props.zones, this.state.duration);
	},
	handleChange(value) {
		this.setState({
        	duration: value
      	});
	},
	renderForm() {
   		return <div className = "timePicker">
	   		<p>Set Time (mins)</p>
	   		<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
   		</div>
	},
	render() {
		return <div className = "app-panel">
			<h2 className = "bg-gray">Start All Zones</h2>
			<div className = "app-panel-inner">
				{this.state.loading ? this.renderLoader() : null}
				<p className  = "number-label">Set Time (mins)</p>
   				<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
				<button className = "active"  onClick={this.startAllZones}>Start All Zones</button>
			</div>
		</div>
	}
})