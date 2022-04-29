import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>Service } from '../_services/<%= dasherize(name) %>.service'
import { AlertService } from '../../../_services/alert/alert.service'

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
        private _<%= camelize(name) %>Service: <%= classify(name) %>Service,
        private _alertService: AlertService) {

    }

    validationMessages = {
        name: [
            {type: 'required', message: 'Name is required.'}
        ],
        description: [

        ]
    };

    ngOnInit() {
       const id = this.route.snapshot.params.id;
       this._<%= camelize(name) %>ModelService.init(id);

       this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required)
       });
    }

    onNameChange($event) {
        this._<%= camelize(name) %>ModelService.get()['name'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getName() {
        return this._<%= camelize(name) %>ModelService.get()['name'];
    }

    onDescriptionChange($event) {
        this._<%= camelize(name) %>ModelService.get()['description'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getDescription() {
        return this._<%= camelize(name) %>ModelService.get()['description'];
    }

    onSaveBtnClicked()
    {
        const self = this;

        this._<%= camelize(name) %>ModelService.save().then((rtnobj) => {
            self._alertService.show({
                header: 'Alright!',
                message: "Your Topic changes were saved!",
                buttons: [
                    {
                        text: 'OK', role: 'cancel', handler: () => {
                            self.dirty = false;
                        }
                    }]
            })
        })
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.router.navigate(['/<%= dasherize(name) %>']);
    }
}
