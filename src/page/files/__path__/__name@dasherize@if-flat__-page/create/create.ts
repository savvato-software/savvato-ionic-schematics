import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { <%= classify(name) %>Service } from '../_services/<%= dasherize(name) %>.service'

@Component({
    selector: '<%= dasherize(name) %>-create',
    templateUrl: './create.html',
    styleUrls: ['./create.<%= styleext %>']
})
export class Create<%= classify(name) %>Page implements OnInit {

    name: string;
    description: string;
    errorMessage: string;

    constructor(private <%= dasherize(name) %>Service: <%= classify(name) %>Service, private _location: Location, private router: Router) {
        this.name = '';
        this.description = '';
        this.errorMessage = '';
    }

    ngOnInit(): void {

    }

    submit(name: string, description: string) {
        this.<%= dasherize(name) %>Service.create(name, description).then((new<%= classify(name) %>) => {
            console.log("<%= classify(name) %> created!", new<%= classify(name) %>);
        })
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.navigateTo("/<%= dasherize(name) %>")
    }

    navigateTo(url?: string) {

        // TODO, kinda thinkin' we don't need this method..............

        url = url || 'nav';
        this.router.navigate([url], { replaceUrl: true });
    }
}
