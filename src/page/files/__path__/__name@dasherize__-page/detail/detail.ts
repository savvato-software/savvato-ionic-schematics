import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service'

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
                private _<%= dasherize(name) %>ModelService: <%= classify(name) %>ModelService) {

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
}
