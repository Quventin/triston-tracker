import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFactionPowersComponent } from './player-faction-powers.component';

describe('PlayerFactionPowersComponent', () => {
  let component: PlayerFactionPowersComponent;
  let fixture: ComponentFixture<PlayerFactionPowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerFactionPowersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerFactionPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
