import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from 'savvato-javascript-services';
//import { PictureService } from "../../../_services/picture/picture.service";

import { <%= classify(name) %>Service } from "./<%= dasherize(name) %>.service";

import { environment } from '../../../_environments/environment';
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
<%= classify(name) %>
export class <%= classify(name) %>ModelService {

    model: any = undefined;

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _<%= dasherize(name) %>Service: <%= classify(name) %>Service,
//                private _pictureService: PictureService,
                private _constants: Constants) {

    }

    init(id) {
        this._<%= dasherize(name) %>Service.getById(id).
        then((response) => {
            this.model = response;
        })
    }

    get() {
        return this.model;
    }

    save() {
        const self = this;

        return new Promise((resolve, reject) => {
            const url = environment.apiUrl + "/api/<%= dasherize(name) %>";
            self._apiService.post(url, self.model)
                .subscribe((resp) => {
                        const newModel = resp;

                        let func = () => {
                            resolve(newModel);
                        }

                        // if (self.isImageChanged()) {
                        //     self._pictureService.save(this._constants.PHOTO_TYPE_<%= capitalize(name) %>, newModel["id"], self.model["imageFilePath"]).then((data) => {
                                func();
                            // }, (err) => {
                            //     reject(err);
                            // });
                        //
                        // } else
                        //     func();
                    },
                    (err) => {
                        console.log("Error calling API POST for " + url)
                        console.log(JSON.stringify(err))
                        reject(err);
                    });
        });
    }

    JSON_to_URLEncoded(element,key,list){
        var list = list || [];
        if(typeof(element)=='object'){
            for (var idx in element)
                this.JSON_to_URLEncoded(element[idx],key?key+'['+idx+']':idx,list);
        } else {
            list.push(key+'='+encodeURIComponent(element));
        }

        return list.join('&');
    }

    delete(model) {
        let self = this;
        return new Promise((resolve, reject) => {
            let url = environment.apiUrl + "/api/<%= dasherize(name) %>/" + model["id"];
            this._apiService.delete(url, {})
                .subscribe((resp) => {
                    let obj = resp;

                    resolve(obj);
                }, (err) => {
                    reject(err);
                });
        });
    }

    isImageChanged() {
        return this.model["imageFilePath_OriginalValue"] != this.model["imageFilePath"];
    }
}
