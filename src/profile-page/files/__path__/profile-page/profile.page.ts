import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {ProfileModelService} from "./_services/profile.model.service";

import {AuthService} from "savvato-javascript-services";

import * as moment from 'moment'

@Component({
  selector: '<%= selector %>',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.<%= styleext %>']
})
export class ProfilePage implements OnInit, OnDestroy {

  constructor(private router: Router,
              private _profileModelService: ProfileModelService,
              private _authService: AuthService) {

  }

  public ngOnInit() {
    this._profileModelService.init(this._authService.getUser()['id']);
  }

  public ngOnDestroy() {

  }

  onEditBtnClick() {
    this.navigateTo('edit');
  }

  getAssociatedImage() {
    return this._profileModelService.get()['image'];
  }

  getUsername() {
    return this._profileModelService.get()['name'];
  }

  getPhoneNumber() {
    return this._profileModelService.get()['phoneNumber'];
  }

  getMemberSince() {
    return moment.unix(this._profileModelService.get()['created'] / 1000).fromNow();
  }

  onHomeBtnClick() {
    this.navigateTo("home");
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }
}
