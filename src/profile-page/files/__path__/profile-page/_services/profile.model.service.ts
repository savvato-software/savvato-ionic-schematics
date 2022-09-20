import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from 'savvato-javascript-services';
import { PictureService } from "../../../_services/picture/picture.service";

import { ProfileApiService } from "./profile.api.service";

import { environment } from '../../../_environments/environment';
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ProfileModelService {

    model: any = undefined;

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _profileApiService: ProfileApiService,
                private _pictureService: PictureService,
                private _constants: Constants) {

    }

    init(id) {
        this._profileApiService.getById(id).then((response) => {
            this.model = response;

            this._pictureService.getAssociatedImage(this._constants.PHOTO_TYPE_TOPIC, this._authService.getUser(), this._constants.PHOTO_SIZE_THUMBNAIL).then((imageData) => {
                imageData.subscribe( id => { this.model["image"] = id; });
            })
        })

    }

    get() {
        return this.model;
    }

    save() {
        const self = this;

        return new Promise((resolve, reject) => {
            const url = environment.apiUrl + "/api/profile";
            self._apiService.post(url, self.model)
                .subscribe((resp) => {
                        const newModel = resp;

                        let func = () => {
                            resolve(newModel);
                        }

                        func();
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

    isImageChanged() {
        return this.model["imageFilePath_OriginalValue"] != this.model["imageFilePath"];
    }
}
