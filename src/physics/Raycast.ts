import * as THREE from 'three';
import { World } from '../world/World';

export interface RaycastHit {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  block: number;
}

export function raycastBlocks(world: World, origin: THREE.Vector3, direction: THREE.Vector3, maxDistance = 7, step = 0.08): RaycastHit | null {
  const pos = origin.clone();
  const dir = direction.clone().normalize();
  const normal = new THREE.Vector3();

  for (let traveled = 0; traveled <= maxDistance; traveled += step) {
    const bx = Math.floor(pos.x);
    const by = Math.floor(pos.y);
    const bz = Math.floor(pos.z);
    const block = world.getBlock(bx, by, bz);
    if (block !== 0) {
      return {
        position: new THREE.Vector3(bx, by, bz),
        normal: normal.clone(),
        block
      };
    }
    pos.addScaledVector(dir, step);
  }

  return null;
}