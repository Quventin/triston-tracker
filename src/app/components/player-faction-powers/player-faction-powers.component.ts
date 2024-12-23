import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import * as data from '../../../assets/source.json';
import {Overall} from "../../../Models/Overall";
import {PlayerFactions} from "../../../Models/PlayerFactions";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-player-faction-powers',
  standalone: true,
  imports: [
    CommonModule,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './player-faction-powers.component.html',
  styleUrl: './player-faction-powers.component.scss'
})
export class PlayerFactionPowersComponent {
  data = (data as unknown) as Overall
  factionPowerData: Array<{name: string, power: number}> = []
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.generateFactionPowerData()
  }

  generateFactionPowerData() {
    this.factionPowerData = this.data.playerFactions.map((faction: PlayerFactions) => {
      return {
        name: faction.name,
        power: faction.power
      }
    })
  }
}
