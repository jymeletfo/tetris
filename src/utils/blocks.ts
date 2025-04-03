import { config } from "./init";
import { getBoardChildren } from "./init";

const startColumn = Math.floor(config.cols / 2) - 1;

const zPiece = [
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
  [0, 1, config.cols + 1, config.cols + 2],
  [1, config.cols, config.cols + 1, 2 * config.cols],
];

const iPiece = [
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
  [0, config.cols, 2 * config.cols, 3 * config.cols],
  [0, 1, 2, 3],
];

const oPiece = [
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
  [0, 1, config.cols, config.cols + 1],
];

function getRandomBlock() {
  const shapes = ["i", "z"];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

export class Block {
  position: number;
  rotation: number;
  block: number[][];

  constructor() {
    this.position = startColumn;
    this.rotation = 0;

    this.block = this.getNewBlock();
  }

  getNewBlock() {
    const shapes = ["i", "z", "o"];
    switch (shapes[Math.floor(Math.random() * shapes.length)]) {
      case "i":
        return iPiece;
      case "z":
        return zPiece;
      case "o":
        return oPiece;
      default:
        return iPiece;
    }
  }

  /**
   * Check if any tile in the block is on the border line (left or right)
   * @returns true, false
   */
  needsAdjustment() {
    for (let i = 0; i < this.getShape().length; i++) {
      if ((this.getShape()[i] + this.position) % config.cols == 0) {
        console.log("it does");
        return true;
      }
    }
    return false;
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

    // If any tile is on the border, move the block to the right
    while (this.needsAdjustment()) {
      this.position += 1;
    }
  }

  goRight() {
    if (this.position % config.cols === config.cols - 1) return;
    this.position += 1;

    // If any tile is on the border, move the block to the left
    while (this.needsAdjustment()) {
      this.position -= 1;
    }
  }

  checkCollision() {
    const tiles = getBoardChildren();

    for (let i = 0; i < this.getShape().length; i++) {
      if (
        tiles[
          this.block[this.rotation][i] + this.position + config.cols
        ].classList.contains("taken")
      ) {
        return true;
      }
    }

    return false;
  }
}
