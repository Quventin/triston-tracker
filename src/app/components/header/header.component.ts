import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {Overall} from "../../../Models/Overall";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() data: Overall = {
    players: [],
    playerFactions: [],
    mafac: [],
    mifac: [],
    gscCorruption: 0,
    chaosRace: 0,
    totalBattles: 0,
    totalDeaths: 0,
    version: 0,
    battles: []
  }
  constructor(private router: Router) {}
  navigateToFactionPowers() {
    this.router.navigate(['/player-faction-powers', this.data]);
  }

  navigateToPlayerInformation() {
    this.router.navigate(['/player-information', this.data]);
  }
  navigateToBattles() {
    this.router.navigate(['/battles', this.data]);
  }
}
