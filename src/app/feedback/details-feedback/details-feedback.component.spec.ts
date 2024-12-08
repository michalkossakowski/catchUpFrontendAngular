import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFeedbackComponent } from './details-feedback.component';

describe('DetailsFeedbackComponent', () => {
  let component: DetailsFeedbackComponent;
  let fixture: ComponentFixture<DetailsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
