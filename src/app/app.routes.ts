import { Routes } from '@angular/router';
import {PlayerFactionPowersComponent} from "./components/player-faction-powers/player-faction-powers.component";
import {PlayerInformationComponent} from "./components/player-information/player-information.component";
import {BattlesComponent} from "./components/battles/battles.component";

export const routes: Routes = [
  { path: '', redirectTo: '/player-faction-powers', pathMatch: 'full' }, // Ensure pathMatch is a literal "full"
  {
    path: 'player-faction-powers',
    component: PlayerFactionPowersComponent,
    pathMatch: 'full'
  },
  {
    path: 'player-information',
    component: PlayerInformationComponent,
    pathMatch: 'full'
  },
  {
    path: 'battles',
    component: BattlesComponent,
    pathMatch: 'full'
  },
];
