export interface Agent {
  name: string;
  gang: string;
  types: AgentType;
  dataCardImage: string;
  isMifac: boolean;
  isPF: boolean;
  id: string;
}

enum AgentType {
  Bodyguard,
  Operative,
  Representative,
  DramatisPersonae,
}
