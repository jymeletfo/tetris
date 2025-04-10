import { config } from "./init";

export class Stack {
  public allBlocks: number[] = [];
  private rowsToDelete: number[] = [];

  // Add a block position to the stack
  push(position: number): void {
    this.allBlocks.push(position);
  }

  // Identify rows that are full and mark them for deletion
  checkRowsToBreak(): void {
    this.rowsToDelete = [];
    for (let i = 0; i < config.rows; i++) {
      if (this.isRowFull(i * config.cols)) {
        this.rowsToDelete.push(i);
      }
    }
  }

  // Break all full rows and reorganize the stack
  breakFullRows(): void {
    for (const row of this.rowsToDelete) {
      this.deleteRow(row * config.cols);
      this.shiftBlocksDown(row * config.cols);
    }
    this.rowsToDelete = [];
  }

  // Check if a specific row is full
  private isRowFull(rowStart: number): boolean {
    return Array.from({ length: config.cols }, (_, j) => rowStart + j).every(
      (pos) => this.allBlocks.includes(pos)
    );
  }

  // Delete a specific row from the stack
  private deleteRow(rowStart: number): void {
    this.allBlocks = this.allBlocks.filter(
      (pos) => pos < rowStart || pos >= rowStart + config.cols
    );
  }

  // Shift blocks above a deleted row down by one row
  private shiftBlocksDown(rowStart: number): void {
    this.allBlocks = this.allBlocks.map((pos) =>
      pos < rowStart ? pos + config.cols : pos
    );
  }
}
