import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarSubcategoriaComponent } from './dialog-editar-subcategoria.component';

describe('DialogEditarSubcategoriaComponent', () => {
  let component: DialogEditarSubcategoriaComponent;
  let fixture: ComponentFixture<DialogEditarSubcategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditarSubcategoriaComponent]
    });
    fixture = TestBed.createComponent(DialogEditarSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
