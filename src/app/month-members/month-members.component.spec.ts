import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthMembersComponent } from './month-members.component';

describe('MonthMembersComponent', () => {
  let component: MonthMembersComponent;
  let fixture: ComponentFixture<MonthMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
