import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideOptionsComponent } from './side-options.component';

describe('SideOptionsComponent', () => {
  let component: SideOptionsComponent;
  let fixture: ComponentFixture<SideOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideOptionsComponent ]
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
