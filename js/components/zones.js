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
  	onChange(event) {
		this.setState({
			active:false
		})
	},
	getInitialState() {
		return {
			duration:1,
			active: false
		}
	},
	handleChange(value) {
		this.setState({
        	duration: value
      	});
      	ZoneStartStore.updateZone(this.props.id,value);
      	this.props.onActivate();
	},
	toggleActive() {
		this.setState({
			active: !this.state.active
		});
		ZoneStartStore.activateZone(this.props.id, this.state.duration);
		this.props.onActivate();
	},
	renderForm() {
   		return <div className = "timePicker">
	   		<p>Set Time (mins)</p>
	   		<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
	   		
   		</div>
	},
	render() {
		return <div className = "zone" >
			<img src = {this.props.imageUrl} />
			<div onClick={this.toggleActive}>
				<div className = "zone-name">{ this.props.name }</div>
				<div className = "zone-info-wrapper clearfix">
					<span className = "zone-info">Watered <br /> {utils.secsToDate(this.props.lastWateredDate)} </span>
					<span className = "zone-info">Duration  <br />  {this.props.lastWateredDuration} Secs </span>
				</div>
			</div>
			{ this.state.active ? this.renderForm() : null }
		</div>
	}
})