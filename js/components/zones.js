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

      	if(this.state.active) {
      		this.props.onUpdate(this.props.id, value);
      	}
	},
	toggleActive() {
		this.setState({
			active: !this.state.active
		});
		this.props.onActivate(this.props.id, this.state.duration);
	},
	renderForm() {
   		return <div className = "timePicker">
	   		<p>Set Time (mins)</p>
	   		<NumberPicker  max={180} min={1} value={this.state.duration} onChange={this.handleChange}/>
	   		
   		</div>
	},
	render() {
		console.log(this.props);
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