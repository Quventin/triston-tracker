import { RelationWithFaction } from "./RelationshWithFaction";

export interface MajorFaction {
    id: string;
    name: string;
    playerIds: Array<string>
    power: number;
    relationshipWithPF: Array<RelationWithFaction>;
    relationshipWithMafac: Array<RelationWithFaction>;
    relationshipWithMifac: Array<RelationWithFaction>;
}
