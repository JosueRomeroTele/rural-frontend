import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadFileComponent } from './modal-upload-file.component';

describe('ModalUploadFileComponent', () => {
  let component: ModalUploadFileComponent;
  let fixture: ComponentFixture<ModalUploadFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUploadFileComponent]
    });
    fixture = TestBed.createComponent(ModalUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
