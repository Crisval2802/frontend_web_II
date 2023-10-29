import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearSubcategoriaComponent } from './dialog-crear-subcategoria.component';

describe('DialogCrearSubcategoriaComponent', () => {
  let component: DialogCrearSubcategoriaComponent;
  let fixture: ComponentFixture<DialogCrearSubcategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCrearSubcategoriaComponent]
    });
    fixture = TestBed.createComponent(DialogCrearSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
