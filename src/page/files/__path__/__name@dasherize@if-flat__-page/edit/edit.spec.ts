import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit<%= classify(name) %>Page } from './edit';

describe('Edit<%= classify(name) %>Page', () => {
    let component: Edit<%= classify(name) %>Page;
    let fixture: ComponentFixture<Edit<%= classify(name) %>Page>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ Edit<%= classify(name) %>Page ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Edit<%= classify(name) %>Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
