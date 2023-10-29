import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerTransferenciasComponent } from './dialog-ver-transferencias.component';

describe('DialogVerTransferenciasComponent', () => {
  let component: DialogVerTransferenciasComponent;
  let fixture: ComponentFixture<DialogVerTransferenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVerTransferenciasComponent]
    });
    fixture = TestBed.createComponent(DialogVerTransferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
