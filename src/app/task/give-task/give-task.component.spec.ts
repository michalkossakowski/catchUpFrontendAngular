import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveTaskComponent } from './give-task.component';

describe('GiveTaskComponent', () => {
  let component: GiveTaskComponent;
  let fixture: ComponentFixture<GiveTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiveTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
