import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvButtonComponent } from './tv-button.component';

describe('TvButtonComponent', () => {
  let component: TvButtonComponent;
  let fixture: ComponentFixture<TvButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
