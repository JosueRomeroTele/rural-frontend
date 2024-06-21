import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddUsuarioComponent } from './edit-add-usuario.component';

describe('EditAddUsuarioComponent', () => {
  let component: EditAddUsuarioComponent;
  let fixture: ComponentFixture<EditAddUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAddUsuarioComponent]
    });
    fixture = TestBed.createComponent(EditAddUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
