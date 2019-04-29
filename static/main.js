class Profile {

	constructor({username, name: {firstName, lastName}, password}) {
     this.username = username;
	 this.name = {firstName, lastName};
	 this.password = password;
}

	createUser(callback) {

	 const username = this.username;
	 const firstName = this.name.firstName;
	 const lastName = this.name.lastName;
	 const password = this.password;

	return ApiConnector.createUser({username, name: { firstName, lastName },password},
		
	 (error, data) => {
	 console.log(`Creating user ${username}`);
	 callback(error, data);
     });
}

	performLogin(callback) {

	 const username = this.username;
	 const password = this.password;
	 return ApiConnector.performLogin({ username, password }, (error, data) => {
		console.log(`Authorizing user ${this.username}`);
		callback(error, data);
		})
}

	addMoney({ currency, amount }, callback) {
		return ApiConnector.addMoney({ currency, amount }, (error, data) => {
			console.log(`Adding ${amount} of ${currency} to ${this.username}`);
			callback(error, data);
		});
	}

	convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
		return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (error, data) => {
			console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
			callback(error, data);
		});
	}

	transferMoney({ to, amount }, callback) {
		return ApiConnector.transferMoney({ to, amount }, (error, data) => {
			console.log(`Transfering ${amount} of Netcoins to ${to}`);
			callback(error, data);
		});
	}
}