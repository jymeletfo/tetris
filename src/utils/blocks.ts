import { config } from "./init";

export function square(position: number, rotation: number) {
  switch (rotation) {
    case 0:
      return [
        position,
        position + 1,
        position + config.cols + 1,
        position + config.cols + 2,
      ];
    case 1:
      return [
        position,
        position + config.cols + 1,
        position + 2 * config.cols + 2,
        position + 2 * config.cols + 1,
      ];
    case 2:
      return [
        position,
        position + 1,
        position + config.cols + 1,
        position + config.cols + 2,
      ];
    case 3:
      return [
        position,
        position + config.cols + 1,
        position + 2 * config.cols + 2,
        position + 2 * config.cols + 1,
      ];
  }
}
