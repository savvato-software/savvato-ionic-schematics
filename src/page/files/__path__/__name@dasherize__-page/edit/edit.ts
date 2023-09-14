import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service'
import { AlertService } from '../../../_services/alert/alert.service'

@Component({
    selector: '<%= dasherize(name) %>-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.<%= styleext %>']
})
export class Edit<%= classify(name) %>Page implements OnInit
{
    id: number
    model:any = undefined;

    validationsForm: FormGroup;

    nameControl: FormControl;
    descriptionControl: FormControl;

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

    ngOnInit() {
        const self = this;

        self.route.params.subscribe((params: any) => {
            self.id = Number(params['id']);

            self.model = self._<%= dasherize(name) %>ModelService.getById(self.id);

            self.nameControl = new FormControl(self.model.name, Validators.required);
            self.descriptionControl = new FormControl(self.model.description, Validators.required);

            self.validationsForm = this.formBuilder.group({
                name: self.nameControl,
                description: self.descriptionControl
            });
        });
    }

    onNameChange($event) {
        this._<%= camelize(name) %>ModelService.getById(this.id)['name'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getName() {
        return this._<%= camelize(name) %>ModelService.getById(this.id)['name'];
    }

    onDescriptionChange($event) {
        this._<%= camelize(name) %>ModelService.getById(this.id)['description'] = $event.currentTarget.value;

        this.dirty = true;
    }

    getDescription() {
        return this._<%= camelize(name) %>ModelService.getById(this.id)['description'];
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
                            self.on<%= classify(name) %>sPageBtnClick();
                        }
                    }]
            })
        })
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.router.navigate(['/<%= dasherize(name) %>s']);
    }
}
