import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchoolingComponent } from './edit-schooling.component';

describe('EditSchoolingComponent', () => {
  let component: EditSchoolingComponent;
  let fixture: ComponentFixture<EditSchoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSchoolingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSchoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
