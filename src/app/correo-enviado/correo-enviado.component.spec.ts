import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoEnviadoComponent } from './correo-enviado.component';

describe('CorreoEnviadoComponent', () => {
  let component: CorreoEnviadoComponent;
  let fixture: ComponentFixture<CorreoEnviadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorreoEnviadoComponent]
    });
    fixture = TestBed.createComponent(CorreoEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
