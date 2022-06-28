import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordUpdateComponent } from './forget-password-update.component';

describe('ForgetPasswordUpdateComponent', () => {
  let component: ForgetPasswordUpdateComponent;
  let fixture: ComponentFixture<ForgetPasswordUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
