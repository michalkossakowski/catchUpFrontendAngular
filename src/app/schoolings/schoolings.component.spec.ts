import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingsComponent } from './schoolings.component';

describe('SchoolingsComponent', () => {
  let component: SchoolingsComponent;
  let fixture: ComponentFixture<SchoolingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
