import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingListMentorComponent } from './schooling-list-mentor.component';

describe('SchoolingListMentorComponent', () => {
  let component: SchoolingListMentorComponent;
  let fixture: ComponentFixture<SchoolingListMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolingListMentorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolingListMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
