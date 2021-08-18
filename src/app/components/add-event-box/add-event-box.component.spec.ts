import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEventBoxComponent} from './add-event-box.component';

describe('AddEventBoxComponent', () => {
  let component: AddEventBoxComponent;
  let fixture: ComponentFixture<AddEventBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEventBoxComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
