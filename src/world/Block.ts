export type BlockId = 0 | 1 | 2 | 3 | 4 | 5;

export interface BlockDefinition {
  id: BlockId;
  name: string;
  color: number;
  solid: boolean;
}

export const BLOCKS: BlockDefinition[] = [
  { id: 0, name: 'Grass', color: 0x57b957, solid: true },
  { id: 1, name: 'Dirt', color: 0x8b5a2b, solid: true },
  { id: 2, name: 'Stone', color: 0x8a95a3, solid: true },
  { id: 3, name: 'Sand', color: 0xd8c08a, solid: true },
  { id: 4, name: 'Wood', color: 0x9a6538, solid: true },
  { id: 5, name: 'Brick', color: 0xb04b4b, solid: true }
];