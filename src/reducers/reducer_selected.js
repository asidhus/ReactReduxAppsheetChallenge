import { SELECTED_USER } from '../actions/index.js';
import { FETCH_USERS } from '../actions/index.js';

export default function(state = {}, action) {
	switch (action.type) {
		//User was selected return the payload
		case SELECTED_USER:
		return action.payload;
		//useres were refreshed return the first user of the array
		case FETCH_USERS:
		return action.payload[0];	
	}
	// return empty object
	return {};
}