import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailDialogComponent } from './user-detail-dialog.component';

describe('UserDetailDialogComponent', () => {
  let component: UserDetailDialogComponent;
  let fixture: ComponentFixture<UserDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
