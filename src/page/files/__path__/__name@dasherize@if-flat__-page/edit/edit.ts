import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>Service } from '../_services/<%= dasherize(name) %>.service'

@Component({
    selector: '<%= dasherize(name) %>-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.<%= styleext %>']
})
export class Edit<%= classify(name) %>Page implements OnInit
{

    model: any = [];

    validationsForm: FormGroup;

    dirty: boolean = false;
    initComplete: boolean = false;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private _<%= camelize(name) %>Service: <%= classify(name) %>Service) {

    }

    validationMessages = {
        name: [
            {type: 'required', message: 'Name is required.'}
        ],
        description: [

        ]
    };

    ngOnInit() {
       const self = this;

       const id = this.route.snapshot.params.id;

       this._<%= camelize(name) %>Service.getById(id).
            then((response) => {
                self.model = response;
                self.initComplete = true;
            })

       this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
       });
    }

    onNameChange($event) {
        this.model['name'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getName() {
        return this.model['name'];
    }

    onDescriptionChange($event) {
        this.model['description'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getDescription() {
        return this.model['description'];
    }

    onSaveBtnClicked() {
        const self = this;
        let obj = Object.assign( {}, this.model );
        this._<%= camelize(name) %>Service.save(obj).then((rtnobj) => {
            self.dirty = false;
        })
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.router.navigate(['/<%= dasherize(name) %>']);
    }
}
