import { Page, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { <%= classify(name) %>Service } from '../_services/<%= dasherize(name) %>.service'

@Page({
    selector: '<%= selector %>-detail',
    templateUrl: './detail.html',
    styleUrls: ['./detail.sass']
})
export class Detail<%= classify(name) %>Page implements OnInit {

    model:any = undefined;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private _location: Location,
                private _<%= dasherize(name) %>Service: <%= classify(name) %>Service) {

    }

    ngOnInit(): void {
        let self = this;

        const id = this.route.snapshot.params.id;

        this._<%= dasherize(name) %>Service.getById(id).
        then((response) => {
            self.model = response;
        })
    }

    onEditBtnClick() {
        this.navigateTo("/<%= dasherize(name) %>/edit/" + this.model.id)
    }

    navigateTo(url?: string) {
        url = url || 'nav';
        this.router.navigate([url], { replaceUrl: true });
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.navigateTo("/<%= dasherize(name) %>")
    }

}
