const rate = 100000000;

class Converter {

	constructor( sum ){
		this.sum = sum;
	}

	toBitcoins(){
		return this.sum / rate;
	}

	toSatoshis(){
		return this.sum * rate;
	}

}

module.exports = Converter;