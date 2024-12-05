import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbieDetailsComponent } from './newbie-details.component';

describe('NewbieDetailsComponent', () => {
  let component: NewbieDetailsComponent;
  let fixture: ComponentFixture<NewbieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewbieDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewbieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
