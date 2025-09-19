import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceptionsComponent } from './list-receptions.component';

describe('ListReceptionsComponent', () => {
  let component: ListReceptionsComponent;
  let fixture: ComponentFixture<ListReceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
