import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Overall} from "../Models/Overall";
import { Player } from '../Models/Player';
import {PlayerFactions} from "../Models/PlayerFactions";
import {NgFor} from "@angular/common";
import * as data from '../assets/source.json';
import {HeaderComponent} from "./components/header/header.component";
import {TableModule} from "primeng/table";
import {Battle} from "../Models/Battle";
import {MajorFaction} from "../Models/MajorFactions";
import {RelationWithFaction} from "../Models/RelationshWithFaction";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, HeaderComponent, TableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  data: any = []
  factionData: Array<{name: string, factionName: number, factionPrestige: number,battles: number, factionPower: number, wins: number}> = []

  factionBattles: Array<{name: string, battles: number, win: number, lose: number}> = []
  constructor(private router: Router) {}

  ngOnInit() {
    this.data = (data as unknown) as Overall
    this.generateFactionData()

    this.factionBattles = this.countFactionBattles()
    this.router.navigate(['/player-faction-powers']);
  }

  countFactionBattles() {
    const factionBattles:Array<{name: string, battles: number, win: number, lose: number}> = []

    this.data.playerFactions.forEach((pf: PlayerFactions) => {
      let battlesFought = 0;
      let battlesWon = 0;
      let battlesLost = 0;

      // Handle special case for specific PlayerFactions ID
      let associatedPlayerIds: Array<string> = [];
      if (pf.id === 'pfac-7917') {
        // Special IDs for mifacs
        const specialIds = ['mifac-3950', 'mifac-398', 'mifac-6938', 'mifac-7316'];

        // Collect player IDs from mifacs
        associatedPlayerIds = this.data.players
          .filter((player: Player) =>
            player.relationshipWithMifac.some((relation: RelationWithFaction) => specialIds.includes(relation.factionId))
          )
          .map((player: Player) => player.id);
      } else {
        // Default to the playerIds for this faction
        associatedPlayerIds = pf.playerIds;
      }

      // Iterate through battles to calculate stats
      this.data.battles.forEach((battle: Battle) => {
        const factionPlayersInBattle = battle.players.filter(player =>
          associatedPlayerIds.includes(player.id)
        );

        if (factionPlayersInBattle.length > 0) {
          battlesFought++; // Faction participated in this battle

          // Check if faction won the battle
          const winners = factionPlayersInBattle.filter(player => player.winner);
          if (winners.length > 0) {
            battlesWon++;
          } else {
            battlesLost++;
          }
        }
      });

      // Save the results for this faction
      factionBattles.push({
        name: pf.name,
        battles: battlesFought,
        win: battlesWon,
        lose: battlesLost,
      });
    });

    return factionBattles;
  }

  // generateFactionPowerData() {
  //  this.factionPowerData = this.data.playerFactions.map((faction: PlayerFactions) => {
  //    return {
  //      name: faction.name,
  //      power: faction.power
  //    }
  //  })
  // }

  generateFactionData() {
    this.factionData = this.data.players.map((player: any) => {
      // Match relationshipWithPF or relationshipWithMifac
      const relationship = (player.isChaos || player.isGsc) ?
        player.relationshipWithMifac.find((f:any) => f.factionId === player.houseId) :

        player.relationshipWithPF.find((f:any) => f.factionId === player.houseId )


      // Find the matching faction
      const faction =
        (player.isChaos || player.isGsc) ?
          this.data.mifac.find((f:any) => f.id === player.houseId) :
          this.data.playerFactions.find((f:any) => f.id === player.houseId )
      const factionPower =
        (player.isChaos || player.isGsc) ?
          this.data.mifac.find((f:any) => f.id === player.houseId).power :
          this.data.playerFactions.find((f:any) => f.id === player.houseId ).power
      const factionWins = this.countPlayerWins(player.id)


      return {
        name: player.name,
        factionName: faction ? faction.name === 'Slave Guild' ? 'Genestealer Cult' : faction.name : 'Unknown',
        factionPrestige: relationship ? relationship.relationship : 0,
        battles: player.battles,
        factionPower: factionPower,
        wins: factionWins
      };
    }).sort((a:any, b:any) => b.factionPower - a.factionPower);
  }

  countPlayerWins(playerId: string): number {
    return this.data.battles.reduce((winCount: number, battle: Battle) => {
      // Check if the player is a winner in this battle
      const playerInBattle = battle.players.find(player => player.id === playerId && player.winner);
      return playerInBattle ? winCount + 1 : winCount;
    }, 0);
  }

}
