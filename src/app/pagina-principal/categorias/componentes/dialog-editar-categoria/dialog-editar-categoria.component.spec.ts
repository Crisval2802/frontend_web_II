import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarCategoriaComponent } from './dialog-editar-categoria.component';

describe('DialogEditarCategoriaComponent', () => {
  let component: DialogEditarCategoriaComponent;
  let fixture: ComponentFixture<DialogEditarCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditarCategoriaComponent]
    });
    fixture = TestBed.createComponent(DialogEditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
