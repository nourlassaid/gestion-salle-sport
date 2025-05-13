import { TestBed } from '@angular/core/testing';

import { MembersList.ComponentGuard } from './members-list.component.guard';

describe('MembersList.ComponentGuard', () => {
  let guard: MembersList.ComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MembersList.ComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
