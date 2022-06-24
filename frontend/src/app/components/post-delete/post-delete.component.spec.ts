import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDeleteComponent } from './post-delete.component';

describe('PostDeleteComponent', () => {
  let component: PostDeleteComponent;
  let fixture: ComponentFixture<PostDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
