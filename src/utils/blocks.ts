import { config } from "./init";

export function zPiece(position: number, rotation: 0 | 1 | 2 | 3) {
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

export function iPiece(position: number, rotation: 0 | 1 | 2 | 3) {
  switch (rotation) {
    case 0:
      return [
        position,
        position + config.cols,
        position + 2 * config.cols,
        position + 3 * config.cols,
      ];
    case 1:
      return [position, position + 1, position + 2, position + 3];
    case 2:
      return [
        position,
        position + config.cols,
        position + 2 * config.cols,
        position + 3 * config.cols,
      ];
    case 3:
      return [position, position + 1, position + 2, position + 3];
  }
}
