const React = require('react');

module.exports = React.createClass({
  getInitialState() {
    return {
      secondsRemaining: 0
    };
  },
  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      // Clear timer state in parent component
      this.props.clear();
      clearInterval(this.interval);
    }
  },
  componentDidMount() {
    this.setState({ secondsRemaining: this.props.secondsRemaining });
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  render() {
    return <p>Seconds Remaining: <span className = "strong">{this.state.secondsRemaining}</span></p>
  }
});
