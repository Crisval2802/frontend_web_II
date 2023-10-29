import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearTransferenciaComponent } from './dialog-crear-transferencia.component';

describe('DialogCrearTransferenciaComponent', () => {
  let component: DialogCrearTransferenciaComponent;
  let fixture: ComponentFixture<DialogCrearTransferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCrearTransferenciaComponent]
    });
    fixture = TestBed.createComponent(DialogCrearTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
