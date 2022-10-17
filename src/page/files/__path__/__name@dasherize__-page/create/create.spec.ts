import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Create<%= classify(name) %>Page } from './create';

describe('Create<%= classify(name) %>Page', () => {
    let component: Create<%= classify(name) %>Page;
    let fixture: ComponentFixture<Create<%= classify(name) %>Page>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ Create<%= classify(name) %>Page ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Create<%= classify(name) %>Page);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
