import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions/index.js';
import { SelectedUser } from '../actions/index.js';


class UserList extends Component {
	//General constructor setup
	constructor(props) {
		super(props);
		//bind functions to this so they have a refrence to props
		this.onRefresh = this.onRefresh.bind(this);
		this.select = this.select.bind(this);
	}
	//Grab users once component is mounted
	componentDidMount() {
	    this.props.fetchUsers();
 	 }
 	 //call Selected user action
 	 select(user) {
 	 	this.props.SelectedUser(user);
 	 }
 	 //call fetchuser action
 	 onRefresh(event) {
 	 	this.props.fetchUsers();
 	 }
 	 //render method
	render () {
		return (
			<div className="sidenav">
			  {this.props.Users.map((item) => {
				return (<a key={item.name} onClick={() => {this.select(item)}}>{item.name}</a>)

				})}
			  <button className="NavBtn" type="submit" onClick={this.onRefresh} className="btn btn-secondary"> Refresh</button>
			</div>
		)
	}
}
//map users to props
function mapStateToProps({ users }) {
	return { Users: users }; // weather:weather same
}
//map actions to dispatch
function mapDispatchToProps (dispatch) {
	return bindActionCreators({ fetchUsers, SelectedUser }, dispatch);
}
//connnect redux to react Component 
export default connect(mapStateToProps, mapDispatchToProps)(UserList);