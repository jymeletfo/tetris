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

    // if (shape === "i") this.block = iPiece;
    // else if (shape === "z") this.block = zPiece;
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
