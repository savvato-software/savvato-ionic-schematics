import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { <%= classify(name) %>Service } from './_services/<%= dasherize(name) %>.service'

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.<%= styleext %>']
})
export class <%= classify(name) %>Page implements OnInit, OnDestroy {

  modelList: any = [];

  constructor(private router: Router,
              private _<%= camelize(name) %>Service: <%= classify(name) %>Service) {

  }

  public ngOnInit() {
    this._<%= camelize(name) %>Service.getAll().then((response) => {
      this.modelList = response;
    })
  }

  public ngOnDestroy() {

  }

  getListOf<%= classify(name) %>s() {
    return this.modelList;
  }

  onNew<%= classify(name) %>BtnClick() {
    this.navigateTo("<%= dasherize(name) %>/create");
  }

  on<%= classify(name) %>Click(model) {
   this.navigateTo("<%= dasherize(name) %>/" + model['<%= dasherize(name) %>'].id)
  }

  onHomeBtnClick() {
    this.navigateTo("home");
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }
}
