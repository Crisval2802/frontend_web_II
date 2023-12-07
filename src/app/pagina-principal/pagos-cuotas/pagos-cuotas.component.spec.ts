import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosCuotasComponent } from './pagos-cuotas.component';

describe('PagosCuotasComponent', () => {
  let component: PagosCuotasComponent;
  let fixture: ComponentFixture<PagosCuotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagosCuotasComponent]
    });
    fixture = TestBed.createComponent(PagosCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
