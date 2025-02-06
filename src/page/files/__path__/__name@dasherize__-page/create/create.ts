import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service';
import { AlertService } from '../../../_services/alert/alert.service';

@Component({
    selector: '<%= dasherize(name) %>-create',
    templateUrl: './create.html',
    styleUrls: ['./create.<%= styleext %>']
})
export class Create<%= classify(name) %>Page implements OnInit {

    model: any = {};
    validationsForm: FormGroup;
    dirty: boolean = false;

    // Dynamically build validation messages from the fields
    validationMessages: any = {
        <% fields.forEach(field => { %>
            <%= field.name %>: [
                <% if (field.required) { %>
                { type: 'required', message: '<%= field.name %> is required.' }
                <% } %>
        ],
            <% }); %>
};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private _<%= camelize(name) %>ModelService: <%= classify(name) %>ModelService,
        private _alertService: AlertService
) {}

    ngOnInit(): void {
        // Build form controls
        const group: { [key: string]: FormControl } = {};

    <% fields.forEach(field => { %>
        {
            const validatorsArr = [];
            <% if (field.required) { %>
            validatorsArr.push(Validators.required);
            <% } %>

            group['<%= field.name %>'] = new FormControl('', validatorsArr);
        }
        <% }); %>

    this.validationsForm = this.formBuilder.group(group);

    // Example of a default ID
    this.model['id'] = -1;
}

    onFieldChange(fieldName: string, event: any) {
        const newValue = event?.detail?.value || event?.target?.value;
        this.model[fieldName] = newValue;
        this.dirty = true;
    }

    onSaveBtnClicked() {
        // If form is invalid, optionally check here.
        if (!this.validationsForm.valid) {
            console.warn("Form invalid, cannot save");
            return;
        }

        this._<%= camelize(name) %>ModelService.save(this.model).then(() => {
            this._alertService.show({
                header: 'Alright!',
                message: `Your <%= classify(name) %> changes were saved!`,
                buttons: [{
                    text: 'OK', role: 'cancel', handler: () => {
                        this.dirty = false;
                        this.on<%= classify(name) %>sPageBtnClick();
                    }
                }]
            });
        });
    }

    on<%= classify(name) %>sPageBtnClick() {
        this.router.navigate(['/<%= dasherize(name) %>s']);
    }
}
