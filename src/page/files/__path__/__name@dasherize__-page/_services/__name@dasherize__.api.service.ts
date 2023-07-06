import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>ApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }

    create(name, description) {
        const url = environment.apiUrl + '/api/<%= dasherize(name) %>/create';
        let data = {'name': name, 'description': description};

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.post(url, data).subscribe(
                    (_data) => {
                        console.log('New <%= classify(name) %> Created!');
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }

    getById(id) {
        const url = environment.apiUrl + '/api/<%= dasherize(name) %>?id=' + id;

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.get(url).subscribe(
                    (_data) => {
                        console.log('Read ' + id + ' <%= classify(name) %> operation completed!');
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }

    getAll() {
        const url = environment.apiUrl + '/api/<%= dasherize(name) %>/all';

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.get(url).subscribe(
                    (_data) => {
                        console.log('Read All <%= classify(name) %> operation completed!');
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }

    save(model) {
        const url = environment.apiUrl + '/api/<%= dasherize(name) %>/save';
        let data = {'id': model['id'], 'name': model['name'], 'description': model['description']};

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.put(url, data).subscribe(
                    (_data) => {
                        console.log('Saved <%= classify(name) %> ' + model['id']);
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }

    delete(model) {
        const url = environment.apiUrl + '/api/<%= dasherize(name) %>?id=' + model['id'];

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.delete(url, { }).subscribe(
                    (_data) => {
                        console.log('Deleted <%= classify(name) %> ' + model['id'] + '!');
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }
}
