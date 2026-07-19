import * as THREE from 'three';
import { CHUNK_SIZE } from '../util/Constants';
import { BLOCKS } from '../world/Block';
import { Chunk } from '../world/Chunk';

export function buildChunkMesh(chunk: Chunk, originX: number, originZ: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ vertexColors: false });
  const mesh = new THREE.InstancedMesh(geometry, material, CHUNK_SIZE * CHUNK_SIZE * CHUNK_SIZE);
  const dummy = new THREE.Object3D();
  let count = 0;

  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const id = chunk.get(x, y, z);
        if (id === 0) continue;
        dummy.position.set(originX + x, y, originZ + z);
        dummy.updateMatrix();
        mesh.setMatrixAt(count, dummy.matrix);
        material.color = new THREE.Color(BLOCKS[id].color);
        count++;
      }
    }
  }

  mesh.count = count;
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}