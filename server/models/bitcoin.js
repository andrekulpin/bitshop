const db = require('../db/redis')();

module.exports = {
	getWallet: function * (){
		return yield db.spop( 'bitcoin_wallets' );
	},
	saveNewWallet: function * ( wif ){
		return yield db.sadd( 'bitcoin_wallets', wif );
	},
	storeRecord: function * ( wif, sum ){
		return yield db.hmset( 'bitcoin_records', wif, sum );
	}
}