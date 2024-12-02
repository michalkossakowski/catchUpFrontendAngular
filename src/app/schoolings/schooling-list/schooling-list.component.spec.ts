import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingListComponent } from './schooling-list.component';

describe('SchoolingListComponent', () => {
  let component: SchoolingListComponent;
  let fixture: ComponentFixture<SchoolingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
