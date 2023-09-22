import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { <%= classify(name) %>ModelService } from './_services/<%= dasherize(name) %>.model.service'
import {Constants} from "../../_constants/constants";
import {PictureService} from "../../_services/picture/picture.service";

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.<%= styleext %>']
})
export class <%= classify(name) %>Page implements OnInit, OnDestroy {

  modelList: any = [];

  constructor(private router: Router,
              private _constants: Constants,
              private _pictureService: PictureService,
              private _<%= camelize(name) %>ModelService: <%= classify(name) %>ModelService) {

  }

  public ngOnInit() {
    this._<%= camelize(name) %>ModelService.init().then((response) => {
      this.modelList = response;
    })
  }

  public ngOnDestroy() {

  }

  getListOf<%= classify(name) %>s() {
    return this._<%= camelize(name) %>ModelService.get();
  }

  onCreateBtnClicked() {
    this.navigateTo("<%= dasherize(name) %>s/create");
  }

  on<%= classify(name) %>Click(model) {
   this.navigateTo("<%= dasherize(name) %>s/" + model['id'])
  }

  onHomeBtnClicked() {
    this.navigateTo("home");
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }

  getAssociatedImage(object: any) {
    const PHOTO_SIZE = 50; // does this even mean anything?
    let rtn = this._pictureService.getAssociatedImage(this._constants.PHOTO_TYPE_PROFILE, object, PHOTO_SIZE);
    return rtn && rtn['url'];
  }
}
