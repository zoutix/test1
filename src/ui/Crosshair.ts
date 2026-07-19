export function createCrosshair(): HTMLDivElement {
  const crosshair = document.createElement('div');
  crosshair.style.position = 'fixed';
  crosshair.style.left = '50%';
  crosshair.style.top = '50%';
  crosshair.style.width = '16px';
  crosshair.style.height = '16px';
  crosshair.style.transform = 'translate(-50%, -50%)';
  crosshair.style.pointerEvents = 'none';
  crosshair.style.zIndex = '10';
  crosshair.style.opacity = '0.9';
  crosshair.innerHTML = '<div style="position:absolute;left:50%;top:50%;width:16px;height:2px;background:#fff;transform:translate(-50%,-50%);border-radius:999px"></div><div style="position:absolute;left:50%;top:50%;width:2px;height:16px;background:#fff;transform:translate(-50%,-50%);border-radius:999px"></div>';
  return crosshair;
}