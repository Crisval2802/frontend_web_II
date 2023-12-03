import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarObjetivoComponent } from './dialog-eliminar-objetivo.component';

describe('DialogEliminarObjetivoComponent', () => {
  let component: DialogEliminarObjetivoComponent;
  let fixture: ComponentFixture<DialogEliminarObjetivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEliminarObjetivoComponent]
    });
    fixture = TestBed.createComponent(DialogEliminarObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
