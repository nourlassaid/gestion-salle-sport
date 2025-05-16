import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningUploadComponent } from './planning-upload.component';

describe('PlanningUploadComponent', () => {
  let component: PlanningUploadComponent;
  let fixture: ComponentFixture<PlanningUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
