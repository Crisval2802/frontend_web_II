import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarCuentaComponent } from './dialog-editar-cuenta.component';

describe('DialogEditarCuentaComponent', () => {
  let component: DialogEditarCuentaComponent;
  let fixture: ComponentFixture<DialogEditarCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditarCuentaComponent]
    });
    fixture = TestBed.createComponent(DialogEditarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
