export interface Battle {
  id: string;
  players: Array<PlayerInBattle>;
  isEvent: boolean;
  isFlashpoint: boolean;
  isDraw: boolean;
  scenarioName: string;
  date: Date;
}

export interface PlayerInBattle {
  id: string;
  name: string;
  winner: boolean;
  sideMission: boolean;
  sideMissionRelationId?: string;
  subPlot: boolean;
  subPlotRelationId?: string;
}
