import { config, getBoardChildren } from "./init";
import { zPiece, iPiece, oPiece } from "./blockTypes";

const startColumn = Math.floor(config.cols / 2) - 1;

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
   * Check if any tile in the block is on the right border line
   * @returns true, false
   */
  tooFarRight(): boolean {
    for (let i = 0; i < this.getShape().length; i++) {
      if ((this.getShape()[i] + this.position) % config.cols == 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if any tile in the block is on the left border line
   * @returns true, false
   */
  tooFarLeft(): boolean {
    for (let i = 0; i < this.getShape().length; i++) {
      if (
        (this.getShape()[i] + this.position) % config.cols ==
        config.cols - 1
      ) {
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
    this.position -= 1;

    // If any tile is on the border, move the block to the right
    while (this.tooFarLeft()) {
      this.position += 1;
    }
  }

  goRight() {
    this.position += 1;

    // If any tile is on the border, move the block to the left
    while (this.tooFarRight()) {
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
