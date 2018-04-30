import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions/index.js';

class UserDetails extends Component {
	//General constructor setup
	constructor(props) {
		super(props);
	}
	//render method
	render () {
		return this.props.selected.name ? (
			<div className="usercard">
				<h1 className="username">{this.props.selected.name.toUpperCase()}</h1>
				<img src= {this.props.selected.photo} alt="Mountain View"></img>
				<h5>{"Phone:"+this.props.selected.number}</h5>
				<div className="userbody">{"Bio: "+this.props.selected.bio}</div>
				<div className="userAge">{"Age: "+this.props.selected.age}</div>
			</div>
		):
		(
			<div>Loading</div>
			);
	}
}
//Map selected user to props
function mapStateToProps({ selected }) {
	return { selected }; 
}

//connnect redux to react Component 
export default connect(mapStateToProps, null)(UserDetails);
