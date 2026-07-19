import * as THREE from 'three';
import { Renderer } from './engine/Renderer';
import { Input } from './engine/Input';
import { World } from './world/World';
import { Player } from './player/Player';
import { createCrosshair } from './ui/Crosshair';
import { createHotbar } from './ui/Hotbar';
import { raycastBlocks } from './physics/Raycast';

export class Game {
  private readonly renderer: Renderer;
  private readonly input: Input;
  private readonly world: World;
  private readonly player: Player;
  private readonly clock = new THREE.Clock();

  constructor(root: HTMLElement) {
    this.renderer = new Renderer(root);
    this.input = new Input(this.renderer.domElement);
    this.world = new World();
    this.player = new Player(this.renderer.camera, this.input, this.world);

    document.body.appendChild(createCrosshair());
    document.body.appendChild(createHotbar());

    window.addEventListener('mousedown', (event) => {
      if (event.button !== 0 && event.button !== 2) return;
      const direction = new THREE.Vector3();
      this.player.camera.getWorldDirection(direction);
      const hit = raycastBlocks(this.world, this.player.camera.position, direction);
      if (!hit) return;
      if (event.button === 0) {
        this.world.setBlock(hit.position.x, hit.position.y, hit.position.z, 0);
      } else {
        const placePos = hit.position.clone().add(hit.normal);
        this.world.setBlock(placePos.x, placePos.y, placePos.z, 1);
      }
    });
  }

  start(): void {
    const tick = () => {
      const dt = Math.min(0.033, this.clock.getDelta());
      this.player.update(dt);
      this.world.update(this.player.position);
      this.renderer.render(this.world.scene, this.player.camera);
      requestAnimationFrame(tick);
    };

    tick();
  }
}