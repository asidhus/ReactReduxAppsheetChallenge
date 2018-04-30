import axios from 'axios';

// Constantly used variables
const Method = 'list';
const ROOT_URL = `https://appsheettest1.azurewebsites.net/sample/${Method}`;
const ROOT_URL_Detail = `https://appsheettest1.azurewebsites.net/sample/detail/`;
var IDs = [];
var ID_Details = {};

//Actions
export const FETCH_USERS = 'FETCH_USERS';
export const SELECTED_USER = 'SELECTED_USER';

//Grab user information
export function fetchUsers() {
	//request promise for given api endpoint
	const request =  axios.get(ROOT_URL);
	//Check if there is a token returned with IDs if so continue to 
	//grab Ids otherwise grab details ongiven Ids
	return request.then(({data}) => {
		IDs =  [ ...IDs, ...data.result ];
		if(data.token) {
			return grabAllIds(data.token);
		} else {
			return grabAllIdDetails(0);
		}
	});
}

//Grab Ids with given token
function grabAllIds(token) {
	const url = `${ROOT_URL}/?token=${token}`
	return axios.get(url).then(({data}) => {
		IDs =  [ ...IDs, ...data.result ];
		//If there is a token keep grabing IDs
		//else move onto grabbing user details
		if(data.token) {
			return grabAllIds(data.token);
		} else {
			return grabAllIdDetails(0);
		}
	});
}

// Grab All Details from User IDs
function grabAllIdDetails(num) {
	const url = `${ROOT_URL_Detail}${IDs[num]}`;
	return axios.get(url).then(({data}) => {
		ID_Details[data.id] = data;
		if(num !== IDs.length-1) {
			return grabAllIdDetails(num+1);
		} else {
			return {
				type: FETCH_USERS,
				IDs: IDs,
				ID_Details: ID_Details,
				payload: GrabYoungest(),
			}
		}
	}).catch(err => {
		if(num !== IDs.length-1) {
			return grabAllIdDetails(num+1);
		} else {
			return {
				type: FETCH_USERS,
				IDs: IDs,
				ID_Details: ID_Details,
				payload: GrabYoungest(),
			}
		}
	});

}

//Go through user details and grab 5 youngest users
function GrabYoungest() {
	var youngestValidUsers = [];
	IDs = Object.keys(ID_Details);
	//sort user IDs by age
	function compare (a, b) {
		if(ID_Details[a].age > ID_Details[b].age) {
			return 1;
		} else{
			return -1;
		}
	}
	//Sort 
	IDs = IDs.sort(compare);
	let i = 0;
	//grab 5 users only if they have valid numbers
	while (i < IDs.length && youngestValidUsers.length !== 5) {
		//check for sntactically valid numbers
		if(ValidNumber(ID_Details[IDs[i]].number)){
			youngestValidUsers.push(ID_Details[IDs[i]]);
		}
		i+=1;
	}

	return youngestValidUsers;
}




//check if there are 10 or 11 digit numbers
function ValidNumber (num) {
	var counter = 0;
	for(var i of num) {
		if(!isNaN(i)) {
			counter += 1;
		}
	}
	if(counter === 10 || counter === 11) {
		return true;
	}
	return false;
}
	

// reeturn selected user action
export function SelectedUser(user) {
	return {
		type: SELECTED_USER,
		payload: user,
	}
}
