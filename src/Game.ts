import * as THREE from 'three';
import { Renderer } from './engine/Renderer';
import { Input } from './engine/Input';
import { World } from './world/World';
import { Player } from './player/Player';

export class Game {
  private readonly root: HTMLElement;
  private readonly renderer: Renderer;
  private readonly input: Input;
  private readonly world: World;
  private readonly player: Player;
  private readonly clock = new THREE.Clock();

  constructor(root: HTMLElement) {
    this.root = root;
    this.renderer = new Renderer(root);
    this.input = new Input(this.renderer.domElement);
    this.world = new World();
    this.player = new Player(this.renderer.camera, this.input, this.world);
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