import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerImagenComponent } from './dialog-ver-imagen.component';

describe('DialogVerImagenComponent', () => {
  let component: DialogVerImagenComponent;
  let fixture: ComponentFixture<DialogVerImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVerImagenComponent]
    });
    fixture = TestBed.createComponent(DialogVerImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
