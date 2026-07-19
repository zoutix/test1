import * as THREE from 'three';
import { clamp } from '../util/Math';
import { GRAVITY, JUMP_VELOCITY, PLAYER_HEIGHT, PLAYER_RADIUS, SPRINT_SPEED, WALK_SPEED } from '../util/Constants';
import { Input } from '../engine/Input';
import { World } from '../world/World';

export class Player {
  public readonly camera: THREE.PerspectiveCamera;
  public readonly position = new THREE.Vector3(0, 20, 0);
  private velocity = new THREE.Vector3();
  private onGround = false;

  constructor(camera: THREE.PerspectiveCamera, private readonly input: Input, private readonly world: World) {
    this.camera = camera;
    this.camera.position.copy(this.position).add(new THREE.Vector3(0, PLAYER_HEIGHT, 0));
  }

  update(dt: number): void {
    const speed = this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight') ? SPRINT_SPEED : WALK_SPEED;
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).multiplyScalar(-1);

    const move = new THREE.Vector3();
    if (this.input.isDown('KeyW')) move.add(forward);
    if (this.input.isDown('KeyS')) move.sub(forward);
    if (this.input.isDown('KeyA')) move.sub(right);
    if (this.input.isDown('KeyD')) move.add(right);
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(speed);

    this.velocity.x = move.x;
    this.velocity.z = move.z;

    const mouse = this.input.consumeMouseDelta();
    const yaw = -mouse.dx * 0.0022;
    const pitch = -mouse.dy * 0.0022;
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y += yaw;
    this.camera.rotation.x = clamp(this.camera.rotation.x + pitch, -1.45, 1.45);

    if (this.onGround && this.input.isDown('Space')) {
      this.velocity.y = JUMP_VELOCITY;
      this.onGround = false;
    }

    this.velocity.y -= GRAVITY * dt;

    const next = this.position.clone().addScaledVector(this.velocity, dt);
    if (this.collides(next)) {
      if (this.velocity.y < 0) this.onGround = true;
      this.velocity.y = 0;
      next.y = this.position.y;
      next.x = this.position.x + this.velocity.x * dt;
      if (this.collides(next)) next.x = this.position.x;
      next.z = this.position.z + this.velocity.z * dt;
      if (this.collides(next)) next.z = this.position.z;
    } else {
      this.onGround = false;
    }

    this.position.copy(next);
    this.camera.position.set(this.position.x, this.position.y + PLAYER_HEIGHT, this.position.z);
  }

  private collides(position: THREE.Vector3): boolean {
    const minX = Math.floor(position.x - PLAYER_RADIUS);
    const maxX = Math.floor(position.x + PLAYER_RADIUS);
    const minY = Math.floor(position.y);
    const maxY = Math.floor(position.y + PLAYER_HEIGHT);
    const minZ = Math.floor(position.z - PLAYER_RADIUS);
    const maxZ = Math.floor(position.z + PLAYER_RADIUS);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (this.world.getBlock(x, y, z) !== 0) return true;
        }
      }
    }
    return false;
  }
}