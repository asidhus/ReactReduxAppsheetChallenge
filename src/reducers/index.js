import { combineReducers } from 'redux';
import Users from './reducer_user.js';
import Selected from './reducer_selected.js'

const rootReducer = combineReducers({
  users: Users,
  selected: Selected,
});

export default rootReducer;
