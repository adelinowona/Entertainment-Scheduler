/* eslint-disable no-unused-vars */
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideOptionsComponent} from './side-options.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';


describe('SideOptionsComponent', () => {
  let component: SideOptionsComponent;
  let fixture: ComponentFixture<SideOptionsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideOptionsComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
