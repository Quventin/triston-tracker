// src/app/models/overall.model.ts
import { Battle } from './Battle';
import { MajorFaction } from './MajorFactions';
import { MinorFaction } from './MinorFactions';
import { Player } from './Player';
import { PlayerFactions } from './PlayerFactions';

export interface Overall {
  players: Array<Player>
  playerFactions: Array<PlayerFactions>
  mafac: Array<MajorFaction>
  mifac: Array<MinorFaction>
  gscCorruption: number
  chaosRace: number
  totalBattles: number
  totalDeaths: number
  version: number
  battles: Array<Battle>
}
