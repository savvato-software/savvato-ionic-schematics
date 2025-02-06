import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ActionSheetController} from "@ionic/angular";

import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

import { <%= classify(name) %>ModelService } from '../_services/<%= dasherize(name) %>.model.service';
import { AlertService } from '../../../_services/alert/alert.service';
import { PictureService } from "../../../_services/picture/picture.service";
import { CameraService } from "../../../_services/camera/camera.service";

@Component({
    selector: '<%= dasherize(name) %>-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.<%= styleext %>']
})
export class Edit<%= classify(name) %>Page implements OnInit {

    id: number;
    model: any = {};         // The existing <%= classify(name) %> record
    validationsForm: FormGroup;
    dirty = false;
    fields: any[] = <%= JSON.stringify(fields) %>;
    pageTitle: string = "<%= classify(name) %>";

    validationMessages: any = {}; // Now dynamically generated

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private _http: HttpClient,
        private _<%= camelize(name) %>ModelService: <%= classify(name) %>ModelService,
        private _alertService: AlertService,
        private _pictureService: PictureService,
        private _cameraService: CameraService,
        private _actionSheetController: ActionSheetController,
) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = Number(params['id']);

            // 1. Fetch existing record
            const found = this._<%= camelize(name) %>ModelService.getById(this.id);
            this.model = found ? found : {};

            // 2. Build form controls for each field dynamically
            const group: { [key: string]: FormControl } = {};
            this.validationMessages = {};

            this.fields.forEach(field => {
                let validators = [];
                if (field.required) {
                    validators.push(Validators.required);
                    this.validationMessages[field.name] = [
                        { type: 'required', message: `${field.name} is required.` }
                    ];
                }

                // Grab the existing value from this.model
                const initialValue = this.model[field.name];

                group[field.name] = new FormControl(initialValue, validators);
            });

            this.validationsForm = this.formBuilder.group(group);
        });
    }

    onFieldChange(fieldName: string, event: any) {
        // 3. Keep 'this.model' updated with new user input
        const newValue = event?.detail?.value || event?.currentTarget?.value;
        this.model[fieldName] = newValue;
        this.dirty = true;
    }

    onSaveBtnClicked() {
        if (!this.validationsForm.valid) {
            console.warn("Form is invalid, check validation messages.");
            return;
        }

        this._<%= camelize(name) %>ModelService.save(this.model).then(rtnobj => {
            this._alertService.show({
                header: 'Alright!',
                message: `Your ${this.pageTitle} changes were saved!`,
                buttons: [
                    {
                        text: 'OK', role: 'cancel', handler: () => {
                            this.dirty = false;
                            this.onNavigateToList();
                        }
                    }
                ]
            });
        });
    }

    onNavigateToList() {
        this.router.navigate([`/<%= dasherize(name) %>s`]);
    }

    getAssociatedImage() {
        return this.model["image"];
    }

    getAssociatedImageCSS() {
        return " centered ";
    }

    onAssociatedImageClick($event) {
        const self = this;

        self.presentActionSheet({
                callbackFunc: (pathAndSourceType) => {
                    if (pathAndSourceType !== undefined) {
                        let webPath = '';
                        let imageFileSource = pathAndSourceType['imageFileSource'];
                        if (imageFileSource === 'camera') {
                            webPath = pathAndSourceType["image"]["webPath"]
                        } else if (imageFileSource === 'gallery') {
                            webPath = pathAndSourceType["image"]["photos"][0]["webPath"]
                        } else {
                            //
                        }

                        self._http.get(webPath, {responseType: "blob"})
                            .pipe(
                                switchMap(async (response: Blob) => Observable.create(obs => {
                                    const reader = new FileReader();

                                    reader.onerror = err => obs.error(err);
                                    reader.onabort = err => obs.error(err);
                                    reader.onload = () => obs.next(reader.result);
                                    reader.onloadend = () => obs.complete();

                                    return reader.readAsDataURL(response);
                                }))
                            ).subscribe(
                            (imgData) => {
                                imgData.subscribe(
                                    id => {
                                        self.model["image"] = id;
                                        self.model["imageWebPath"] = webPath;
                                        self.model["isImageChanged"] = true;
                                        // self.dirty = true;
                                    })
                            }
                        )
                    }
                }
            }
        )
    }

    onAssociatedImagePress($event) {
        let self = this;

        if (self.model["imageWebPath"] && self.model["imageWebPath"].indexOf("color-block") === -1) {
            self._alertService.show({
                title: 'Delete Photo?',
                message: 'Do you want to DELETE this picture?',
                buttons: [
                    {
                        text: 'No', role: 'cancel', handler: () => {
                            // do nothing
                        },
                    }, {
                        text: 'Yes', handler: () => {
                            // this.logger.debug('setting photo ' + self.model["id"] + ' to be deleted from the server on save()');
                            self.model["image"] = undefined;
                            self.model["imageWebPath"] = undefined;
                            self.model["isImageChanged"] = true;
                            self._pictureService.setDefaultImageOnModel(self.model);
                            // self.dirty = true;
                        },
                    }
                ]
            });
        }
    }

    async presentActionSheet(props) {

        const actionSheet = await this._actionSheetController.create({
            header: 'Which way to your new photo?',
            buttons: [{
                text: 'Camera',
                icon: 'camera-outline',
                data: 'camera',
            }, {
                text: 'Photo Gallery',
                icon: 'grid-outline',
                data: 'gallery',
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
            }]
        });

        await actionSheet.present();

        const { data } = await actionSheet.onDidDismiss();

        let returnData;

        switch (data) {
            case 'camera':
                await this._cameraService.takePicture().then((imageData) => {
                    // this.logger.debug("just took a picture. Its at " + imageData['path']);
                    returnData = {imageFileSource: 'camera', image: imageData['image']};
                });
                break;
            case 'gallery':
                await this._cameraService.loadGalleryPicture().then((imageData) => {
                    // this.logger.debug("just set a picture from the gallery. Its at " + imageData['path']);
                    returnData = {imageFileSource: 'gallery', image: imageData['image']};
                });
                break;
        }

        props.callbackFunc(returnData);
    }
}
