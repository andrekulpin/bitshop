const Transaction = require('../services/Transaction');
const Request = require('request');

module.exports = {

	transfer: function( userAddress, amount ){
		
		const tx = new Transaction();


		const tx = new bitcoin.TransactionBuilder();
		//{pub: ...,priv: ..., balance: ..., txId: ...}
		const newBalance = balance - amount;
		const newAddress = bitcoin.ECPair.makeRandom();

		tx.addInput(addressInfo.txId, 0);
		tx.addOutput(userAddress, amount);
		tx.addOutput(newAddress.getAddress(), newBalance);
		tx.sign(0, keyPair)
		const transactionHex = tx.build().toHex();
		const req = request('https://blockchain.info/pushtx', transactionHex);
		yield req.exec();
		
	}

}