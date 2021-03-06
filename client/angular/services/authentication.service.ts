import 'rxjs/add/operator/toPromise';

import { Injectable }				from '@angular/core';
import { Http, Headers, Response }	from '@angular/http';
import { Observable }				from 'rxjs/Rx'; //'rxjs/Observable';

import { EndPoint }					from './http-client.service';
import { Language }					from '../models/language.model';

//{auth: false, data: 'errordatabase', token: null}
export class Auth {
	auth:	boolean;
	data:	any;
	token:	string;
}

@Injectable()
export class AuthenticationService {
	
	constructor (
		private http: Http) { }
	
	login (language: Language, userId: string, password: string): Promise<Auth> {
		
		var params = JSON.stringify({userId: userId, password: password});
		
		return this.httpPost(EndPoint.login, params, this.getHeaders(language, ''));
	}
	
	logout (language: Language, token: string) {
		
		var params = JSON.stringify({ });
		
		return this.httpPost(EndPoint.logout, params, this.getHeaders(language, token));
	}
	
	singup (language: Language, userId: string, password: string, email: string): Promise<Auth> {
		
		var params = JSON.stringify({userId: userId, password: password, email: email});
		
		return this.httpPost(EndPoint.singup, params, this.getHeaders(language, ''));
	}
	
	private getHeaders(language: Language, token: string): {} {
		
		var headers = new Headers();
		
		headers.append('content-type', 'application/json');
		headers.append('content-language', (language==undefined) ? 'ca-es' : language.code);
		
		if (token != '') { headers.append('x-security-token', token); }
		
		return { headers: headers };
	}
	
	private handleError (error: any): Promise<any> {
		
		console.log('An error occurred ' + error);
		return Promise.reject(error.message || error);
	}
	
	private httpPost (endPoint, params, headers): Promise<Auth> {
		
		return this.http.post(endPoint, params, headers)
			.toPromise()
			.then(response => response.json() as Auth)
			.catch(this.handleError);
	}
	
}