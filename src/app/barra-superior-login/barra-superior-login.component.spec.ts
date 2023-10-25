import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraSuperiorLoginComponent } from './barra-superior-login.component';

describe('BarraSuperiorLoginComponent', () => {
  let component: BarraSuperiorLoginComponent;
  let fixture: ComponentFixture<BarraSuperiorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarraSuperiorLoginComponent]
    });
    fixture = TestBed.createComponent(BarraSuperiorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
