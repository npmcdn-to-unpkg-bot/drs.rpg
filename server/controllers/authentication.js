// file: ./server/controllers/authentication.js

var path		= require('path');
var promise 	= require('bluebird');
var connection	= require(path.join(global.__root + '/server/middlewares/connection.js'));
var service		= require(path.join(global.__root + '/server/services/authentication.token.js'));

exports.login = function(req, res) {
	
	connection.open()
		.then(connectionOpen)
		.catch(connectionError);
	
	function connectionOpen (database) {
		var model = require(path.join(global.__root + '/server/models/account.js'));
		
		model.initialize(database);
		
		model.login(req.body.userId, req.body.password)
			.then(loginOk)
			.catch(loginError());
			
		function loginOk (account) {
			if (account == null) {
				res.json({auth: false, data: 'loginerror', token: null});
			}
			else {
				res.json({ auth: true, data: account, token: service.createToken(account) });
			}
			database.close();
		}
		
		function loginError (err) {
			console.log('Error login: ' + err);
			res.json({auth: false, data: 'errorlogin', token: null});
			database.close();
		}
	}
	
	function connectionError (err) {
		console.log('Error database: ' + err);
		res.json({auth: false, data: 'errordatabase', token: null});
	}
	
};

exports.logout = function (req, res) {
	res.json({auth: true, data: '', token: null});
};

exports.singup = function(req, res) {
	
	connection.open()
		.then(connectionOpen)
		.catch(connectionError);
	
	function connectionOpen (database) {
		var languageModel	= require(path.join(global.__root + '/server/models/language.js'));
		var roleModel		= require(path.join(global.__root + '/server/models/role.js'));
		
		languageModel.initialize(database);
		roleModel.initialize(database);
		var promises		= [];
		
		promises.push(languageModel.getByCode(req.body.language));
		promises.push(roleModel.getByName('master'));
		promises.push(roleModel.getByName('player'));
		
		promise.all(promises)
			.then(getOk)
			.catch(getError);
		
		function getOk (result) {
			var model	= require(path.join(global.__root + '/server/models/account.js'));
			var roles			= [];
			
			model.initialize(database);
			
			roles.push(result[1]);
			roles.push(result[2]);
			
			model.add(req.body.userId, req.body.password, req.body.email, result[0], roles)
				.then(addOk)
				.catch(addError);
			
			function addOk (account) {
				if (account == null) {
					res.json({ auth: true, data: account, token: service.createToken(account) });
				}
				else {
					res.json({auth: false, data: 'singupexists', token: null});
				}
				database.close();
			}
			
			function addError (err) {
				console.log('Error singup.add: ' + err);
				res.json({auth: false, data: 'error singup.add', token: null});
				database.close();
			}
		}
		
		function getError (err) {
			console.log('Error singup.get: ' + err);
			res.json({auth: false, data: 'error singup.get', token: null});
			database.close();
		}
	}
	
	function connectionError (err) {
		console.log('Error database: ' + err);
		res.json({auth: false, data: 'errordatabase', token: null});
	}
	
};