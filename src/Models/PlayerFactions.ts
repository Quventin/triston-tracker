import { Agent } from "./agents";
import { RelationWithFaction } from "./RelationshWithFaction";

export interface PlayerFactions {
    id: string;
    name: string;
    playerIds: Array<string>
    power: number;
    relationshipWithPF: Array<RelationWithFaction>;
    relationshipWithMafac: Array<RelationWithFaction>;
    relationshipWithMifac: Array<RelationWithFaction>;
    dramatisList: Array<Agent>
}
