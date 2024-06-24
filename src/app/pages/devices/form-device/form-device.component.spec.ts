import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeviceComponent } from './FormDeviceComponent';

describe('FormDeviceComponent', () => {
  let component: FormDeviceComponent;
  let fixture: ComponentFixture<FormDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDeviceComponent]
    });
    fixture = TestBed.createComponent(FormDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
