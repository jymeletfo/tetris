import { config } from "./init";

export class Stack {
  public allBlocks: number[];
  private rowsToDelete: number[];

  constructor() {
    this.allBlocks = [];
    this.rowsToDelete = [];
  }

  push(position: number) {
    this.allBlocks.push(position);
  }

  checkRowsToBreak() {
    for (let i = 0; i < config.rows; i++) {
      if (
        this.checkIfRowIsFull(i * config.cols) &&
        !this.rowsToDelete.includes(i)
      ) {
        this.rowsToDelete.push(i);
      }
    }
  }

  breakFullRows() {
    while (this.rowsToDelete.length > 0) {
      // delete the first row to be broken
      this.deleteRow(this.rowsToDelete[0] * config.cols);
      this.reorganizeBlocks(this.rowsToDelete[0] * config.cols);

      // remove the row from the rowsToDelete array
      this.rowsToDelete.splice(0, 1);

      // recheck the rows after the reorganization
      this.checkRowsToBreak();
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

  reorganizeBlocks(rowStart: number) {
    for (let i = rowStart + config.cols; i >= 0; i--) {
      if (this.allBlocks.includes(i)) {
        this.allBlocks[this.allBlocks.indexOf(i)] += config.cols;
      }
    }
  }
}
