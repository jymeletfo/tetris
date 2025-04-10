import { config, getBoardChildren } from "./init";
import { Piece } from "../types/piece";
import { zPiece, sPiece, iPiece, oPiece, lPiece, jPiece } from "./blockTypes";

const startColumn = Math.floor(config.cols / 2) - 1;

export class Block {
  position: number = startColumn;
  rotation: number = 0;
  block: Piece = this.getNewBlock();

  // Randomly selects a new block shape
  private getNewBlock(): Piece {
    const shapes: Piece[] = [iPiece, zPiece, sPiece, oPiece, lPiece, jPiece];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }

  // Returns the current shape of the block based on its rotation
  public getShape(): number[] {
    return this.block[this.rotation];
  }

  // Checks if the block is too far to the right
  private tooFarRight(): boolean {
    return this.getShape().some(
      (tile) => (tile + this.position) % config.cols === 0
    );
  }

  // Checks if the block is too far to the left
  private tooFarLeft(): boolean {
    return this.getShape().some(
      (tile) => (tile + this.position) % config.cols === config.cols - 1
    );
  }

  // Moves the block down
  goDown(): void {
    this.position += config.cols;
  }

  // Rotates the block
  rotate(): void {
    this.rotation = (this.rotation + 1) % 4;
  }

  // Moves the block left and adjusts if it goes out of bounds
  goLeft(): void {
    this.position -= 1;
    if (this.tooFarLeft()) this.position += 1;
  }

  // Moves the block right and adjusts if it goes out of bounds
  goRight(): void {
    this.position += 1;
    if (this.tooFarRight()) this.position -= 1;
  }

  // Checks for collision with other blocks or the bottom of the board
  checkCollision(): boolean {
    const tiles = getBoardChildren();
    return this.getShape().some((tile) =>
      tiles[tile + this.position + config.cols].classList.contains("taken")
    );
  }
}
