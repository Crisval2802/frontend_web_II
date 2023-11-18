import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCrearLimiteComponent } from './dialog-crear-limite.component';

describe('DialogCrearLimiteComponent', () => {
  let component: DialogCrearLimiteComponent;
  let fixture: ComponentFixture<DialogCrearLimiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCrearLimiteComponent]
    });
    fixture = TestBed.createComponent(DialogCrearLimiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
