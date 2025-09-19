import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningImageListComponent } from './planning-image-list.component';

describe('PlanningImageListComponent', () => {
  let component: PlanningImageListComponent;
  let fixture: ComponentFixture<PlanningImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
