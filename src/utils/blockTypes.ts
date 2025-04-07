import { config } from "./init";
import { Piece } from "../types/piece";

export const zPiece: Piece = [
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
];

export const sPiece: Piece = [
  [0, 1, config.cols, config.cols + 1],
  [1, config.cols + 1, 2 * config.cols, 2 * config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [1, config.cols + 1, 2 * config.cols, 2 * config.cols + 1],
];

export const iPiece: Piece = [
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
];

export const lPiece: Piece = [
  [0, config.cols, 2 * config.cols, 2 * config.cols + 1],
  [0, 1, 2, 2 - config.cols],
  [0, 1, 1 + config.cols, 2 * config.cols + 1],
  [0, 1, 2, config.cols],
];

export const jPiece: Piece = [
  [0, config.cols, 2 * config.cols, 2 * config.cols - 1],
  [0, 1, 2, 2 + config.cols],
  [0, 1, config.cols, 2 * config.cols],
  [0, config.cols, config.cols + 1, config.cols + 2],
];

export const oPiece: Piece = [
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
];
