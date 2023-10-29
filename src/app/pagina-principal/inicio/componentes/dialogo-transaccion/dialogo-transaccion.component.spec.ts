import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoTransaccionComponent } from './dialogo-transaccion.component';

describe('DialogoTransaccionComponent', () => {
  let component: DialogoTransaccionComponent;
  let fixture: ComponentFixture<DialogoTransaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoTransaccionComponent]
    });
    fixture = TestBed.createComponent(DialogoTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
