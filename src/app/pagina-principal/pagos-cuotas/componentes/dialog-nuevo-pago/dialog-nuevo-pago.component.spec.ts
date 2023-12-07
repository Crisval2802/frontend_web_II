import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNuevoPagoComponent } from './dialog-nuevo-pago.component';

describe('DialogNuevoPagoComponent', () => {
  let component: DialogNuevoPagoComponent;
  let fixture: ComponentFixture<DialogNuevoPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNuevoPagoComponent]
    });
    fixture = TestBed.createComponent(DialogNuevoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
