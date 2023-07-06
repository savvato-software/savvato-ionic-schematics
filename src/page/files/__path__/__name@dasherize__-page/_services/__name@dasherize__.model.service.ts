import { Injectable } from '@angular/core';
import {AuthService} from '@savvato-software/savvato-javascript-services';

import { <%= classify(name) %> } from "../_types/<%= dasherize(name) %>.type";
import { <%= classify(name) %>ApiService } from "./<%= dasherize(name) %>.api.service";

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>ModelService {

    model: <%= classify(name) %>[] = [];

    constructor(private _authService: AuthService,
                private _<%= dasherize(name) %>ApiService: <%= classify(name) %>ApiService,
                private _constants: Constants) {

    }

    init() {
        return this._<%= dasherize(name) %>ApiService.getAll().then((response: <%= classify(name) %>[]) => {
            this.model = response;
        })
    }

    get() {
        return this.model;
    }

    getById(id) {
        return this.model.find(x => x['id'] === id);
    }

    save(model) {
        const self = this;
        return self._<%= dasherize(name) %>ApiService.save(model).then((response) => {
            self.init();
        });
    }

    delete(model) {
        const self = this;
        return self._<%= dasherize(name) %>ApiService.delete(model).then((response) => {
            self.init();
        });
    }
}
