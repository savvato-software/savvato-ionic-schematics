import { Injectable } from '@angular/core';
import {AuthService, ModelTransformingService } from '@savvato-software/savvato-javascript-services';

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
                private _constants: Constants,
                private _modelTransformingService: ModelTransformingService) {

    }

    funcKey = '<%= dasherize(name) %>-get-by-id';

    init() {
        const self = this;

        self._functionPromiseService.initFunc(self.funcKey, (data) => {
            self._<%= dasherize(name) %>ApiService.getById(data['id']).then((response: <%= classify(name) %>) => {
                self.model['id'] = response;
            });
        });

        self._modelTransformingService.reset();
        self._modelTransformingService.clearAllTransformers();

        self._modelTransformingService.addTransformer((model, fin) => {
            self._<%= dasherize(name) %>ApiService.getAll().then((response: <%= classify(name) %>[]) => {
                model['all'] = response;
                fin();
            })
        });

        return self._modelTransformingService.transform(self.model);
    }

    get() {
        return this.model['all'];
    }

    getById(id) {
        if (this.model['id'])
            return this.model['id'];
        else
            return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, {id: id});
    }

    save(model) {
        const self = this;
        if (model['id'] === -1) {
            return self._<%= dasherize(name) %>ApiService.create(model).then((response) => {
                self.init();
            });
        } else {
            return self._<%= dasherize(name) %>ApiService.save(model).then((response) => {
                self.init();
            });
        }
    }

    delete(model) {
        const self = this;
        return self._<%= dasherize(name) %>ApiService.delete(model).then((response) => {
            self.init();
        });
    }
}
