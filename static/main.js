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
		
	 (err, data) => {
	 console.log(`Creating user ${username}`);
	 callback(err, data);
     });
}

	performLogin(callback) {

	 const username = this.username;
	 const password = this.password;
	 return ApiConnector.performLogin({ username, password }, (err, data) => {
		console.log(`Authorizing user ${this.username}`);
		callback(err, data);
		})
}

	addMoney({ currency, amount }, callback) {
		return ApiConnector.addMoney({ currency, amount }, (err, data) => {
		console.log(`Adding ${amount} of ${currency} to ${this.username}`);
		callback(err, data);
		});
	}

	convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
		return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
		console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
		callback(err, data);
		});
	}

	transferMoney({ to, amount }, callback) {
		return ApiConnector.transferMoney({ to, amount }, (err, data) => {
		console.log(`Transfering ${amount} of Netcoins to ${to}`);
		callback(err, data);
		});
	}
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data[0]);
    });
}

let stocks;

getStocks((err, data) => {
    if (err) {
        console.error('Error during getting stocks info');
    } else {
        stocks = data;
        console.log(`Actual stocks info is loading`);
        console.log(data);
    }
});

//Задача №2

function main() {
	const ivan = new Profile({
		username: 'ivan',
		name: { firstName: 'Ivan', lastName: 'Ivanov' },
		password: 'ivan123'
	});

    const petya = new Profile({
         username: 'petya',
         name: { firstName: 'Petr', lastName: 'Petrov' },
         password: 'petya123'
     });

    
    ivan.createUser( (err, data) => {
		if (err) {
			console.log('Create user is failed');
		} else {
			console.log('ivan is created!');
			ivan.performLogin( (err, data) => {
				if (err) {
					console.log('Login is failed');
				} else {
					console.log('ivan is authorized');
					ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
						if (err) {
							console.error('Error during adding money to ivan');
						} else {
							console.log('Added 500000 euros to ivan');
							ivan.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: 36000 }, (err, data) => {
								if (err) {
									console.log('Error during conversion');
								} else {
									console.log('Converted to coins ', { name: {firstName: 'Ivan', lastName: 'Ivanov'}, wallet: {amount: 36000, currency: 'NETCOIN'}, username: 'ivan' });
									      petya.createUser((err,data) => {
                                                    if (err) {
                                                        console.error('Create user is failed');
                                                    } else {
                                                        console.log(`petya is created`);
									ivan.transferMoney({ to: 'petya', amount: 36000 }, (err, data) => {
										if (err) {
											console.log('Transfer 36000 Netcoins is failed');
										} else {
											console.log('petya has got 36000 Netcoins');
										}
									});
								}
							});
						}
					});
				}
		    });
		}
	});
  }
}

main();