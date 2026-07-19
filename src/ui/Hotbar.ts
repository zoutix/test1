import { BLOCKS } from '../world/Block';

export function createHotbar(): HTMLDivElement {
  const hotbar = document.createElement('div');
  hotbar.style.position = 'fixed';
  hotbar.style.left = '50%';
  hotbar.style.bottom = '18px';
  hotbar.style.transform = 'translateX(-50%)';
  hotbar.style.display = 'grid';
  hotbar.style.gridTemplateColumns = `repeat(${BLOCKS.length}, 1fr)`;
  hotbar.style.gap = '8px';
  hotbar.style.padding = '10px';
  hotbar.style.background = 'rgba(10,14,18,0.66)';
  hotbar.style.border = '1px solid rgba(255,255,255,0.14)';
  hotbar.style.borderRadius = '18px';
  hotbar.style.zIndex = '10';

  BLOCKS.forEach((block, index) => {
    const slot = document.createElement('div');
    slot.dataset.index = String(index);
    slot.style.width = '54px';
    slot.style.height = '54px';
    slot.style.borderRadius = '14px';
    slot.style.border = '1px solid rgba(255,255,255,0.14)';
    slot.style.display = 'grid';
    slot.style.placeItems = 'center';
    slot.style.position = 'relative';
    slot.style.color = '#fff';
    slot.style.fontSize = '12px';
    slot.style.fontWeight = '700';
    slot.style.background = 'rgba(255,255,255,0.06)';
    slot.innerHTML = `<span>${index + 1}</span><div style="position:absolute;left:8px;right:8px;bottom:8px;height:16px;border-radius:999px;background:#${block.color.toString(16).padStart(6, '0')};border:1px solid rgba(255,255,255,0.12)"></div>`;
    hotbar.appendChild(slot);
  });

  return hotbar;
}