import { Agent } from "./agents";
import { RelationWithFaction } from "./RelationshWithFaction";

export interface MinorFaction {
    id: string;
    name: string;
    relationshipWithPF: Array<RelationWithFaction>;
    relationshipWithMafac: Array<RelationWithFaction>;
    relationshipWithMifac: Array<RelationWithFaction>;
    playerIds?: Array<string>
    power?: number;
    isGsc: boolean;
    isChaos: boolean;
    agentList: Array<Agent>
}