import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service';
import { PictureService } from '../../../_services/picture/picture.service';
import { Constants } from '../../../_constants/constants';
import { AuthService } from '@savvato-software/savvato-javascript-services';

@Component({
    selector: '<%= selector %>-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.<%= styleext %>']
})
export class Detail<%= classify(name) %>Page implements OnInit {

    id: number;
    model: any = {};
    fields: any[] = <%= JSON.stringify(fields) %>;
    pageTitle: string = "<%= classify(name) %>";

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location,
        private _constants: Constants,
        private _pictureService: PictureService,
        private _<%= dasherize(name) %>ModelService: <%= classify(name) %>ModelService,
        private _authService: AuthService
) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            this.id = Number(params['id']);
            this.model = this._<%= dasherize(name) %>ModelService.getById(this.id) || {};
        });
    }

    isEditBtnEnabled() {
        return this.model && (this.model['userId'] === this._authService.getUser()['id']);
    }

    onEditBtnClick() {
        this.navigateTo(`/<%= dasherize(name) %>s/edit/${this.id}`);
    }

    onNavigateToList() {
        this.navigateTo(`/<%= dasherize(name) %>s`);
    }

    onHomeBtnClick() {
        this.navigateTo("/home");
    }

    navigateTo(url?: string) {
        url = url || 'nav';
        this.router.navigate([url], { replaceUrl: true });
    }

    getCreatedTime() {
        return this.model && this.model['created']
            ? moment.unix(this.model['created'] / 1000).fromNow()
            : 'N/A';
    }

    getLastUpdatedTime() {
        return this.model && this.model['updated']
            ? moment.unix(this.model['updated'] / 1000).fromNow()
            : 'N/A';
    }
}
