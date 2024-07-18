import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarComponent } from './modal-eliminar.component';

describe('ModalEliminarComponent', () => {
  let component: ModalEliminarComponent;
  let fixture: ComponentFixture<ModalEliminarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEliminarComponent]
    });
    fixture = TestBed.createComponent(ModalEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
