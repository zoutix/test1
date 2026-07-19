export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const floorDiv = (value: number, divisor: number): number => Math.floor(value / divisor);