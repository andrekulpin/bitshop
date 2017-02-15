const _ = require('lodash');
const Bitcoin = require('bitcoinjs-lib');
const blockchain = require('blockchain.info/pushtx');

class Transaction {
	constructor(){
		this.tx = new Bitcoin.TransactionBuilder();
		this.steps = [];
		this.address = null;
		this.pool = 0;
		this.fee = 0.0001 * 100000000;
		this.keyPairs = [];
	}

	from( address ){
		const self = this;
		self.steps.push(function * (){
			self.address = address;
			const res = yield {
				balance: address.getBalance(),
				txID: address.getPrevTXID()
			}
			self.balance = res.balance;
			self.tx.addInput( res.txID, self.keyPairs.length );
			self.balance = yield address.getBalance();
			self.keyPairs.push( address.keyPair );
		});
		return self;
	}

	to( address, amount ){
		const self = this;
		self.steps.push(function * (){
			if( !amount ){
				amount = self.balance - self.pool;
				self.tx.addOutput( address, amount );
				return;
			}
			if( self.balance < amount || self.fee >= amount ){
				throw new Error('Insufficient gold.');
			}
			self.pool += amount;
			self.tx.addOutput( address, ( amount - self.fee ) );
		});
		return self;
	}

	*execute(){
		const self = this;
		let step;
		while( step = self.steps.shift() ){

			yield step();

		}
		_.each( self.keyPairs, ( keyPair, index ) => {
			self.tx.sign( index, keyPair );
		})
		const hex = self.tx.build().toHex();
		const res = yield blockchain.pushtx( hex );
		return res;
	}

}

module.exports = Transaction;