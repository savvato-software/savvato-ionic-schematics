import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>Service } from '../_services/<%= dasherize(name) %>.service'

@Component({
    selector: '<%= selector %>-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.scss']
})
export class Edit<%= classify(name) %>Page implements OnInit {

    model: any = undefined;

    name: string = '';
    description: string = '';
    errorMessage: string = '';

    validationsForm: FormGroup;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private _<%= camelize(name) %>Service: <%= classify(name) %>Service) {

    }

    validationMessages = {
        name: [
            {type: 'required', message: 'Name is required.'}
        ],
        description: [

        ]
    };

    ngOnInit(): void {
       const self = this;

       const id = this.route.snapshot.params.id;

       this.<%= classify(name) %>Service.getById(id).
            then((response) => {
                self.model = response;

                self.name = self.model.name;
                self.description = self.model.description;
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
        this._<%= classify(name) %>Service.save(obj).then((rtnobj) => {
            self.dirty = false;
        })
    }
