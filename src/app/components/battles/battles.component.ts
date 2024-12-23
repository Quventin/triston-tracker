import {Component, OnInit} from '@angular/core';
import {Battle} from "../../../Models/Battle";
import {Overall} from "../../../Models/Overall";
import {DialogModule} from "primeng/dialog";
import {CommonModule, DatePipe} from "@angular/common";
import {TableModule} from "primeng/table";
import * as data from '../../../assets/source.json';
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-battles',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    DatePipe,
    TableModule,
    FormsModule
  ],
  templateUrl: './battles.component.html',
  styleUrl: './battles.component.scss'
})
export class BattlesComponent implements OnInit {
  overall = (data as unknown) as Overall
  battles: Battle[] = []; // Battles array
  selectedBattle: Battle | null = null; // Selected battle for the dialog
  isDialogVisible = false; // Flag to show/hide dialog
  filterText: string = ''; // Search text for filtering
  filteredBattles: Battle[] = [];
  ngOnInit() {
    // Initialize battles from overall
    this.battles = this.overall.battles;
    this.filteredBattles = [...this.battles]; // Initialize filtered list
  }

  showBattleDetails(battle: Battle) {
    // Set the selected battle and open the dialog
    this.selectedBattle = battle;
    this.isDialogVisible = true;
  }

  filterBattles() {
    // Filter battles where player names match the search text
    const searchText = this.filterText.toLowerCase();
    this.filteredBattles = this.battles.filter(battle =>
      battle.players.some(player => player.name.toLowerCase().includes(searchText))
    );
  }

  getRelationName(relationId: string): string | null {
    // Search in Player Factions
    const playerFaction = this.overall.playerFactions.find(faction => faction.id === relationId);
    if (playerFaction) {
      return playerFaction.name;
    }

    // Search in Minor Factions
    const minorFaction = this.overall.mifac.find(faction => faction.id === relationId);
    if (minorFaction) {
      return minorFaction.name;
    }

    // Search in Major Factions
    const majorFaction = this.overall.mafac.find(faction => faction.id === relationId);
    if (majorFaction) {
      return majorFaction.name;
    }

    // Return null if no match found
    return null;
  }
}
