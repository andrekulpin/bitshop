const db = require('../db/redis')();
const prefix = 'user:';

module.exports = {

	createUser: function * ({ username, mail, password }){
		return yield db.set( prefix + username, JSON.stringify({ password }) );
	},

	updateUser: function * ( userID, amount ){
		return yield db.incrby( prefix + userID, amount );
	},

	deleteUser: function * (){
		return yield db.decrby( prefix + userID, amount );
	},

	getCredit: function * ( userID ){
		return yield db.get( prefix + userID );
	},

	addToCredit: function * ( userID, amount ){
		return yield db.incrby( prefix + userID, amount );
	},

	deductFromCredit: function * (){
		return yield db.decrby( prefix + userID, amount );
	}

}