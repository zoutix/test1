import { createNoise2D } from 'simplex-noise';
import { CHUNK_SIZE } from '../util/Constants';
import type { BlockId } from './Block';

const noise2D = createNoise2D();

export function getTerrainHeight(worldX: number, worldZ: number): number {
  const base = 6;
  const hills = noise2D(worldX * 0.03, worldZ * 0.03) * 6;
  const detail = noise2D(worldX * 0.08, worldZ * 0.08) * 2;
  return Math.floor(base + hills + detail);
}

export function getBlockForY(y: number, height: number): BlockId {
  if (y === height) return 0;
  if (y >= height - 2) return 1;
  return 2;
}

export function generateChunkData(chunkX: number, chunkZ: number, setBlock: (x: number, y: number, z: number, id: BlockId) => void): void {
  const startX = chunkX * CHUNK_SIZE;
  const startZ = chunkZ * CHUNK_SIZE;

  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      const worldX = startX + x;
      const worldZ = startZ + z;
      const height = getTerrainHeight(worldX, worldZ);
      for (let y = 0; y <= height; y++) {
        setBlock(x, y, z, getBlockForY(y, height));
      }
    }
  }
}