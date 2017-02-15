const Transaction = require('../services/Transaction');
const Address = require('../services/Address');
const Request = require('request');
const model = require('../models/bitcoin');

module.exports = {

	transfer: function*( userAddress, amount ){
		
		const tx = new Transaction();

		const wif = yield model.getWallet();
		const address = new Address( wif );
		const change = new Address();
		
		console.log('wif: ', wif);
		console.log('wif_address', address.address);
		console.log('newAddress', change.address);
		console.log('newWIF', change.wif);

		const signedTx = tx
			.from( address )
			.to( userAddress, amount )
			.to( change.address )

		const res = yield signedTx.execute();
		yield model.saveNewWallet( change.wif );
		console.log(res);
		//yield model.storeRecord( change.wif,  )
		
	}

}