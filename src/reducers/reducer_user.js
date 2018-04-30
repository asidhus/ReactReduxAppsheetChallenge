import { FETCH_USERS } from '../actions/index.js';

export default function(state = [], action) {
	//Return users on fetch user action
	switch (action.type) {
		case FETCH_USERS:
		return action.payload;	
	}
	//return empty array 
	return state;
}