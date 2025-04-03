import { config } from "./init";

const startColumn = Math.floor(config.cols / 2) - 1;

const zPiece = [
  [0, 1, config.cols, config.cols + 1],
  [1, config.cols, config.cols + 1, 2 * config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [1, config.cols, config.cols + 1, 2 * config.cols + 1],
];

const iPiece = [
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
];

export class Block {
  position: number;
  rotation: number;
  block: number[][];

  constructor(shape: "i" | "z") {
    this.position = startColumn;
    this.rotation = 0;

    if (shape === "i") this.block = iPiece;
    else if (shape === "z") this.block = zPiece;
    else this.block = iPiece;
  }

  goDown() {
    this.position += config.cols;
  }

  getShape() {
    return this.block[this.rotation];
  }

  rotate() {
    this.rotation = (this.rotation + 1) % 4;
  }

  goLeft() {
    if (this.position % config.cols === 0) return;
    this.position -= 1;
  }

  goRight() {
    if (this.position % config.cols === config.cols - 1) return;
    this.position += 1;
  }

  checkCollision() {
    // get all div children in the board
    // for (let i = 0; i < this.block[this.rotation].length; i++) {
    // check if the block below contains a taken tile
    // if (this.getShape()[i]  + this.position + 1) {
    // }
  }
}
