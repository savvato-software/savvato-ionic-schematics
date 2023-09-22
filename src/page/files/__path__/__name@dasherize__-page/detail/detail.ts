import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from "@savvato-software/savvato-javascript-services";

import * as moment from 'moment';
import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service'
import {PictureService} from "../../../_services/picture/picture.service";
import {Constants} from "../../../_constants/constants";

@Component({
    selector: '<%= selector %>-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.<%= styleext %>']
})
export class Detail<%= classify(name) %>Page implements OnInit {

    id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private _location: Location,
                private _constants: Constants,
                private _pictureService: PictureService,
                private _<%= dasherize(name) %>ModelService: <%= classify(name) %>ModelService,
                private _authService: AuthService) {

    }

    ngOnInit(): void {
        const self = this;

        self.route.params.subscribe((params: any) => {
            self.id = Number(params['id']);
        });

    }

    get model() {
        return this._<%= dasherize(name) %>ModelService.getById(this.id);
    }

    isEditBtnEnabled() {
        return this._<%= dasherize(name) %>ModelService.getById(this.id)['userId'] === this._authService.getUser()['id'];
    }

    onEditBtnClick() {
        this.navigateTo("/<%= dasherize(name) %>s/edit/" + this.id)
    }

    navigateTo(url?: string) {
        url = url || 'nav';
        this.router.navigate([url], { replaceUrl: true });
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.navigateTo("/<%= dasherize(name) %>s")
    }

    onHomeBtnClick() {
        this.navigateTo("/home")
    }

    getAssociatedImage(model) {
        const PHOTO_SIZE = 50; // does this even mean anything?
        let rtn = this._pictureService.getAssociatedImage(this._constants.PHOTO_TYPE_PROFILE, model, PHOTO_SIZE);
        return rtn && rtn['url'];
    }

    getCreatedTime() {
        return moment.unix(this.model['created'] / 1000).fromNow();
    }

    getLastUpdatedTime() {
        return moment.unix(this.model['lastUpdated'] / 1000).fromNow();
    }
}
