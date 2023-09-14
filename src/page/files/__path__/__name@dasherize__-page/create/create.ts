import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service'
import { AlertService } from '../../../_services/alert/alert.service'

@Component({
    selector: '<%= dasherize(name) %>-create',
    templateUrl: './create.html',
    styleUrls: ['./create.<%= styleext %>']
})
export class Create<%= classify(name) %>Page implements OnInit
{

    model: any = [];

    validationsForm: FormGroup;

    dirty: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private _<%= camelize(name) %>ModelService: <%= classify(name) %>ModelService,
                private _alertService: AlertService) {

    }

    validationMessages = {
        name: [
            {type: 'required', message: 'Name is required.'}
        ],
        description: [

        ]
    };

    ngOnInit(): void {
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

    onSaveBtnClicked()
    {
        const self = this;

        self._<%= camelize(name) %>ModelService.save(self.model).then((rtnobj) => {
            self._alertService.show({
                header: 'Alright!',
                message: "Your <%= classify(name) %> changes were saved!",
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
        this.router.navigate(['/<%= dasherize(name) %>s']);
    }
}
