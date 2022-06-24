import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteDialogComponent } from './post-delete-dialog.component';

describe('PostDeleteDialogComponent', () => {
  let component: PostDeleteDialogComponent;
  let fixture: ComponentFixture<PostDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
