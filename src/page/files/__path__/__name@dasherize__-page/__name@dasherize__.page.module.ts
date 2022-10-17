import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { <%= classify(name) %>PageRoutingModule } from './<%= dasherize(name) %>.page-routing.module';

import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';

import { Create<%= classify(name) %>Page } from './create/create';
import { Detail<%= classify(name) %>Page } from './detail/detail';
import { Edit<%= classify(name) %>Page } from './edit/edit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    <%= classify(name) %>PageRoutingModule
  ],
  declarations: [
    <%= classify(name) %>Page,
    Edit<%= classify(name) %>Page,
    Create<%= classify(name) %>Page,
    Detail<%= classify(name) %>Page
  ]
})
export class <%= classify(name) %>PageModule {}
