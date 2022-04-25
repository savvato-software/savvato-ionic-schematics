import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Detail<%= classify(name) %>Page } from './detail';

describe('Detail<%= classify(name) %>Page', () => {
    let component: Detail<%= classify(name) %>Page;
    let fixture: ComponentFixture<Detail<%= classify(name) %>Page>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ Detail<%= classify(name) %>Page ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Detail<%= classify(name) %>Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
