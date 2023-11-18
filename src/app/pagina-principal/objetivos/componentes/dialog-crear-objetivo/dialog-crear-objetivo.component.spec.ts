import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearObjetivoComponent } from './dialog-crear-objetivo.component';

describe('DialogCrearObjetivoComponent', () => {
  let component: DialogCrearObjetivoComponent;
  let fixture: ComponentFixture<DialogCrearObjetivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCrearObjetivoComponent]
    });
    fixture = TestBed.createComponent(DialogCrearObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
