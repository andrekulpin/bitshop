const Transaction = require('../services/Transaction');
const Request = require('request');

module.exports = {

	transfer: *function( userAddress, amount ){
		
		const tx = new Transaction();
		const wallet = yield db.getWallet();

		const signedTx = tx
			.from( wallet )
			.to( userAddress, amount )
			.sign()

		yield signedTx.execute();
		
	}

}