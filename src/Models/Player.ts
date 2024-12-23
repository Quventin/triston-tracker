import { RelationWithFaction } from "./RelationshWithFaction";

export interface Player {
    id: string;
    name: string;
    houseId: string;
    relationshipWithPF: Array<RelationWithFaction>;
    relationshipWithMifac: Array<RelationWithFaction>;
    relationshipWithMafac: Array<RelationWithFaction>;
    battles: number;
    deaths:number;
    kills: number;
    wins: number;
    lose: number;
    isGsc: boolean;
    isChaos: boolean;

}
