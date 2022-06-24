import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailDialogComponent } from './post-detail-dialog.component';

describe('PostDetailDialogComponent', () => {
  let component: PostDetailDialogComponent;
  let fixture: ComponentFixture<PostDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
