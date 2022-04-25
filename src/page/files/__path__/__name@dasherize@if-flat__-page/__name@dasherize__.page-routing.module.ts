import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';
import { Create<%= classify(name) %>Page } from './create/<%= dasherize(name) %>.page';
import { Detail<%= classify(name) %>Page } from './detail/<%= dasherize(name) %>.page';
import { Edit<%= classify(name) %>Page } from './edit/<%= dasherize(name) %>.page';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: <%= classify(name) %>Page
    },
    {
        path: 'create',
        data: { },
        component: Create<%= classify(name) %>Page
    },
    {
        path: 'edit/:id',
        data: { },
        component: Edit<%= classify(name) %>Page
    },
    {
        path: ':id',
        data: { },
        component: Detail<%= classify(name) %>Page
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class <%= classify(name) %>PageRoutingModule {}
