import {Component, OnInit} from '@angular/core';
import * as data from '../../../assets/source.json';
import {Overall} from "../../../Models/Overall";
import {Player} from "../../../Models/Player";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {PlayerFactions} from "../../../Models/PlayerFactions";
import {MinorFaction} from "../../../Models/MinorFactions";
import {CardModule} from "primeng/card";
import {BonusCardComponent} from "../bonus-card/bonus-card.component";
@Component({
  selector: 'app-player-information',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    CardModule,
    BonusCardComponent
  ],
  templateUrl: './player-information.component.html',
  styleUrl: './player-information.component.scss'
})
export class PlayerInformationComponent implements OnInit{
  overall = (data as unknown) as Overall
  playerOptions: Array<{ label: string; value: string }> = [];
  selectedPlayerId: string | null = null;
  selectedPlayer: Player | null = null;
  playerHouse: string | null = null;
  housePower!: number | undefined
  playerFaction: any = null;
  chaosPower!: number | undefined
  ownHousePrestige!: number | undefined
  isVenator = false
  housePowerBonus = [
    {
      desc: ['+1 To Trading', 'A csatába hozható Heavy/spec fegyverek limitje +1'],
      earned: false
    },
    {
      desc: ['House Agent felbérelhető'],
      earned: false
    },
    {
      desc: ['Nem Triston Dramatis Personae-k felbérelhetőek (Könyvekből)'],
      earned: false
    },
    ]
  housePrestigeBonus = [
    {
      desc: ['+1 To Trading', 'Ganger és Prospect weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Champion weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Vehicle & Crew weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Leader weapon & wargear lista vásárolható'],
      earned: false
    },
  ]
  otherHousePrestigeBonus = [
    {
      desc: ['Juve weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Ganger weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Champion & Prospect weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Vehicle & Crew weapon & wargear lista vásárolható'],
      earned: false
    },
  ]
  venatorLegacyPrestigeBonus = [
    {
      desc: ['+1 To Trading','Juve & Ganger weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Champion & Prospect weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: ['Vehicle & Crew weapon & wargear lista vásárolható'],
      earned: false
    },
    {
      desc: [''],
      earned: false
    },
  ]
  mifacPrestigeBonus = [
    {
      desc: ['+1 To Trading'],
      earned: false
    },
    {
      desc: ['+1 To Trading', 'Felbérelhető speciális egység'],
      earned: false
    },
    {
      desc: ['Egyedi tárgy vásárolható'],
      earned: false
    },
  ]
  houseFavourBonus = 0
  tradingPostBonus = 0
  tradingExplain: Array<string> = []
  favourExplain:Array<string> = []
  constructor() { }
  ngOnInit(): void {
    this.playerOptions = this.overall.players.map(player => ({
      label: player.name,
      value: player.id,
    }));
    console.log('player page', this.playerOptions)
  }


  onPlayerChange(event: any) {
    console.log(
      'Player changed',
      event.value,
      this.overall.players.find(player => player.id === event.value))
    // Find the selected player by ID
    this.selectedPlayer = this.overall.players.find(player => player.id === event.value) || null
    console.log(this.selectedPlayer)
    // Determine the player's house
    if (this.selectedPlayer) {
      this.playerFaction = this.findFaction(this.selectedPlayer.houseId, 'playerFactions') ||
        this.findFaction(this.selectedPlayer.houseId, 'mifac') ||
        'Unknown';
      this.chaosPower = this.overall.playerFactions.find(faction => faction.id === 'pfac-7917')?.power
      this.playerHouse = this.playerFaction.name
      this.housePower = this.playerFaction.power
      const ownRelationship  =
        this.selectedPlayer.relationshipWithMifac.find((v) => v.factionId === this.selectedPlayer?.houseId) ||
        this.selectedPlayer.relationshipWithPF.find((v) => v.factionId === this.selectedPlayer?.houseId)
      if(ownRelationship) {
        this.ownHousePrestige = ownRelationship.relationship
        this.checkHousePrestigeBonus()
        this.calcBonuses()
      }
      this.isVenator = this.selectedPlayer.id === 'player-5147'
      this.checkHousePowerBonus()
    }

  }

  calcBonuses() {
    let trading = 0
    this.tradingExplain = []
    this.favourExplain = []
    if(this.ownHousePrestige && this.ownHousePrestige > 4) {
      trading = trading + 1
      this.tradingExplain.push('House Prestige +1')
    }
    if(!this.selectedPlayer?.isChaos && this.housePower && this.housePower > 5) {
      trading = trading + 1
      this.tradingExplain.push('House Power tier 1')
    }
    if(this.selectedPlayer?.isChaos && this.chaosPower && this.chaosPower > 5) {
      this.tradingExplain.push('Chaos Power tier 1')
      trading = trading + 1
    }
    this.selectedPlayer?.relationshipWithMifac.forEach(relationship => {
      if(relationship.relationship > 4) {
        trading = trading + 1
        this.tradingExplain.push(`Mifac ${relationship.name} tier 1`)
      }
      if(relationship.relationship > 11) {
        trading = trading + 1
        this.tradingExplain.push(`Mifac ${relationship.name} tier 2`)
      }
    })
    let favour = 0
    this.overall.playerFactions.forEach(faction => {
      if(faction.id !== this.selectedPlayer?.houseId) {
        if(!this.selectedPlayer?.isChaos && this.housePower !== undefined && faction.power > this.housePower) {
          favour = favour + 1
        }
        if(this.selectedPlayer?.isChaos && this.chaosPower !== undefined && faction.power > this.chaosPower) {
          favour = favour + 1
        }
      }
    })
    this.tradingPostBonus = trading
    this.houseFavourBonus = favour > 3 ? 3 : favour
  }

  checkHousePowerBonus() {
    if(this.housePower && !this.selectedPlayer?.isChaos) {
      this.housePowerBonus[0].earned = this.housePower > 5 && this.housePower < 15
      this.housePowerBonus[1].earned = this.housePower > 14 && this.housePower < 20
      this.housePowerBonus[2].earned = this.housePower > 19
    }
    else if(this.chaosPower && this.selectedPlayer?.isChaos) {
      this.housePowerBonus[0].earned = this.chaosPower > 5 && this.chaosPower < 15
      this.housePowerBonus[1].earned = this.chaosPower > 14 && this.chaosPower < 20
      this.housePowerBonus[2].earned = this.chaosPower > 19
    }
  }

  checkHousePrestigeBonus() {
    if(this.ownHousePrestige) {
      if(this.isVenator) {
        this.venatorLegacyPrestigeBonus[0].earned = this.ownHousePrestige > 4 && this.ownHousePrestige < 11
        this.venatorLegacyPrestigeBonus[1].earned = this.ownHousePrestige > 9 && this.ownHousePrestige < 15
        this.venatorLegacyPrestigeBonus[2].earned = this.ownHousePrestige > 14 && this.ownHousePrestige < 20
      } else {
        this.housePrestigeBonus[0].earned = this.ownHousePrestige > 4 && this.ownHousePrestige < 11
        this.housePrestigeBonus[1].earned = this.ownHousePrestige > 9 && this.ownHousePrestige < 15
        this.housePrestigeBonus[2].earned = this.ownHousePrestige > 14 && this.ownHousePrestige < 20
        this.housePrestigeBonus[3].earned = this.ownHousePrestige > 19
      }
    }
  }

  findFaction(factionId: string, type: 'playerFactions' | 'mifac') {
    const faction =
      type === 'playerFactions'
        ? this.overall.playerFactions.find(faction => faction.id === factionId)
        : this.overall.mifac.find(faction => faction.id === factionId);
    return faction ? faction : null;
  }

  findFactionName(factionId: string, type: 'playerFactions' | 'mifac') {
    const faction =
      type === 'playerFactions'
        ? this.overall.playerFactions.find(faction => faction.id === factionId)
        : this.overall.mifac.find(faction => faction.id === factionId);
    return faction ? faction.name : null;
  }
}
