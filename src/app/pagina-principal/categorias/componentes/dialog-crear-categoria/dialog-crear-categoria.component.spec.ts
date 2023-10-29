import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearCategoriaComponent } from './dialog-crear-categoria.component';

describe('DialogCrearCategoriaComponent', () => {
  let component: DialogCrearCategoriaComponent;
  let fixture: ComponentFixture<DialogCrearCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCrearCategoriaComponent]
    });
    fixture = TestBed.createComponent(DialogCrearCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
