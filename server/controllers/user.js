const db = require('../models/user');
const _ = require('lodash');

module.exports = {

	createuser: function*( username, password, mail ){
		yield db.insertUser({
			username,
			password,
			mail
		});
	},

	saveuser: function*( id, info ){
		yield db.updateUser( id, info );		
	},

	deleteUser: function( id ){
		yield db.deleteUser( id );
	}

}