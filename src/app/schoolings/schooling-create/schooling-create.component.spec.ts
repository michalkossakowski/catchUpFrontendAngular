import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolingCreateComponent } from './schooling-create.component';

describe('SchoolingCreateComponent', () => {
  let component: SchoolingCreateComponent;
  let fixture: ComponentFixture<SchoolingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolingCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
