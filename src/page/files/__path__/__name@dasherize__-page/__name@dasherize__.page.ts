import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { <%= classify(name) %>ModelService } from './_services/<%= dasherize(name) %>.model.service'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.<%= styleext %>']
})
export class <%= classify(name) %>Page implements OnInit, OnDestroy {

  modelList: any = [];

  constructor(private router: Router,
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
    return this.modelList;
  }

  onCreateBtnClicked() {
    this.navigateTo("<%= dasherize(name) %>/create");
  }

  on<%= classify(name) %>Click(model) {
   this.navigateTo("<%= dasherize(name) %>/" + model['<%= dasherize(name) %>'].id)
  }

  onHomeBtnClicked() {
    this.navigateTo("home");
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }
}
