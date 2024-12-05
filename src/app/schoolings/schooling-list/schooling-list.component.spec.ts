import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingsListComponent } from './schooling-list.component';

describe('SchoolingListComponent', () => {
  let component: SchoolingsListComponent;
  let fixture: ComponentFixture<SchoolingsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolingsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
