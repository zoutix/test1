import * as THREE from 'three';
import { CHUNK_SIZE, RENDER_DISTANCE } from '../util/Constants';
import type { BlockId } from './Block';
import { Chunk } from './Chunk';
import { generateChunkData } from './Terrain';

export class World {
  public readonly scene = new THREE.Scene();
  private readonly chunks = new Map<string, Chunk>();

  constructor() {
    this.scene.fog = new THREE.Fog(0x87c9ff, 20, 120);
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(50, 80, 20);
    this.scene.add(sun);
  }

  update(playerPosition: THREE.Vector3): void {
    const chunkX = Math.floor(playerPosition.x / CHUNK_SIZE);
    const chunkZ = Math.floor(playerPosition.z / CHUNK_SIZE);

    for (let x = chunkX - RENDER_DISTANCE; x <= chunkX + RENDER_DISTANCE; x++) {
      for (let z = chunkZ - RENDER_DISTANCE; z <= chunkZ + RENDER_DISTANCE; z++) {
        this.ensureChunk(x, z);
      }
    }
  }

  getBlock(worldX: number, worldY: number, worldZ: number): BlockId {
    const chunkX = Math.floor(worldX / CHUNK_SIZE);
    const chunkZ = Math.floor(worldZ / CHUNK_SIZE);
    const chunk = this.chunks.get(this.key(chunkX, chunkZ));
    if (!chunk) return 0;

    const localX = ((worldX % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const localZ = ((worldZ % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    if (worldY < 0 || worldY >= CHUNK_SIZE) return 0;
    return chunk.get(localX, worldY, localZ);
  }

  setBlock(worldX: number, worldY: number, worldZ: number, id: BlockId): void {
    const chunkX = Math.floor(worldX / CHUNK_SIZE);
    const chunkZ = Math.floor(worldZ / CHUNK_SIZE);
    const chunk = this.ensureChunk(chunkX, chunkZ);
    const localX = ((worldX % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const localZ = ((worldZ % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    if (worldY < 0 || worldY >= CHUNK_SIZE) return;
    chunk.set(localX, worldY, localZ, id);
  }

  private ensureChunk(chunkX: number, chunkZ: number): Chunk {
    const k = this.key(chunkX, chunkZ);
    let chunk = this.chunks.get(k);
    if (!chunk) {
      chunk = new Chunk();
      generateChunkData(chunkX, chunkZ, (x, y, z, id) => chunk!.set(x, y, z, id));
      this.chunks.set(k, chunk);
    }
    return chunk;
  }

  private key(x: number, z: number): string {
    return `${x},${z}`;
  }
}