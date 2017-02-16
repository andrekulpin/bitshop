const db = require('../db/redis')();
const prefix = 'auth:';

module.exports = {
	auth: function * ( hash ){
		return yield db.exists( hash );
	}
}