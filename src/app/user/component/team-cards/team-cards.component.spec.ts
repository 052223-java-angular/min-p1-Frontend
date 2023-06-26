import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCardsComponent } from './team-cards.component';

describe('TeamCardsComponent', () => {
  let component: TeamCardsComponent;
  let fixture: ComponentFixture<TeamCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardsComponent]
    });
    fixture = TestBed.createComponent(TeamCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
