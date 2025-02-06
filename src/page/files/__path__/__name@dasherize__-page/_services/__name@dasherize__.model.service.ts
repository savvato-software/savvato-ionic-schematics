import { Injectable, Injector } from '@angular/core';
import {AuthService, FunctionService } from '@savvato-software/savvato-javascript-services';

import { <%= classify(name) %> } from "../_types/<%= dasherize(name) %>.type";
import { <%= classify(name) %>ApiService } from "./<%= dasherize(name) %>.api.service";

import { Constants } from "../../../_constants/constants";
import { ModelTransformingServiceProviderService } from "../../_services/model-transforming-service-provider.service";

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>ModelService extends ModelTransformingServiceProviderService {

    model: <%= classify(name) %>[] = [];

    constructor(protected override injector: Injector,
                private _authService: AuthService,
                private _<%= dasherize(name) %>ApiService: <%= classify(name) %>ApiService,
                private _functionService: FunctionService,
                private _constants: Constants) {
        super(injector);
    }

    funcKey = '<%= dasherize(name) %>-get-by-id';

    init() {
        const self = this;

        self._functionService.saveFunction(self.funcKey, (data) => {
            return new Promise((resolve, reject) => {
                self._<%= dasherize(name) %>ApiService.getById(data['id']).then((response: <%= classify(name) %>) => {
                    self.model[data['id']] = response;

                    resolve({response: response});
                });
            });
        });

        const modelTransformationService = this.createModelTransformingService();

        modelTransformationService.reset();
        modelTransformationService.clearAllTransformers();

        modelTransformationService.addTransformer((model, fin) => {
            self._<%= dasherize(name) %>ApiService.getAll().then((response: <%= classify(name) %>[]) => {
                model['all'] = response.sort((a, b) => {
                    return a['lastUpdated'] < b['lastUpdated'] ? 1 : -1;
                });
                fin();
            })
        });

        return modelTransformationService.transform(self.model);
    }

    get() {
        return this.model['all'];
    }

    getById(id) {
        if (this.model[id])
            return this.model[id];
        else
            return this._functionService.getLastResult(this.funcKey, {id: id});
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
