import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.scss']
})
export class <%= classify(name) %>Page implements OnInit, OnDestroy {

  constructor(private router: Router
              ) {

  }

  public ngOnInit() {

  }

  public ngOnDestroy() {

  }
}
