import { config } from "./init";

export const zPiece = [
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
];

export const iPiece = [
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
];

export const oPiece = [
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
];
