import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEliminarLimiteComponent } from './dialog-eliminar-limite.component';

describe('DialogEliminarLimiteComponent', () => {
  let component: DialogEliminarLimiteComponent;
  let fixture: ComponentFixture<DialogEliminarLimiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEliminarLimiteComponent]
    });
    fixture = TestBed.createComponent(DialogEliminarLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
