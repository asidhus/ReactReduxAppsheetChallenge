import React, { Component } from 'react';
import UserDetails from '../containers/user_details.js';
import UserList from '../containers/user_list.js';
export default class App extends Component {
  render() {
    return (
		<div className="Main">
			<UserList />
			<UserDetails />
		</div>
    );
  }
}
