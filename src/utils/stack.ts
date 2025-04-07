import { config } from "./init";

export class Stack {
  public allBlocks: number[];

  constructor() {
    this.allBlocks = [];
  }

  push(position: number) {
    this.allBlocks.push(position);
  }

  breakFullRows() {
    for (let i = 0; i < config.rows; i++) {
      if (this.checkIfRowIsFull(i * config.cols)) {
        this.deleteRow(i * config.cols);
      }
    }
  }

  checkIfRowIsFull(rowStart: number) {
    for (let j = 0; j < config.cols; j++) {
      if (!this.allBlocks.includes(rowStart + j)) return false;
    }
    return true;
  }

  deleteRow(rowStart: number) {
    for (let i = 0; i < config.cols; i++) {
      this.allBlocks.splice(this.allBlocks.indexOf(rowStart + i), 1);
    }
  }
}
