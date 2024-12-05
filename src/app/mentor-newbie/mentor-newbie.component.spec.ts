import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorNewbieComponent } from './mentor-newbie.component';

describe('MentorNewbieComponent', () => {
  let component: MentorNewbieComponent;
  let fixture: ComponentFixture<MentorNewbieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorNewbieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorNewbieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
