import { CHUNK_SIZE } from '../util/Constants';
import type { BlockId } from './Block';

export class Chunk {
  public readonly blocks = new Uint8Array(CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);

  private index(x: number, y: number, z: number): number {
    return x + CHUNK_SIZE * (y + CHUNK_SIZE * z);
  }

  get(x: number, y: number, z: number): BlockId {
    return this.blocks[this.index(x, y, z)] as BlockId;
  }

  set(x: number, y: number, z: number, id: BlockId): void {
    this.blocks[this.index(x, y, z)] = id;
  }
}