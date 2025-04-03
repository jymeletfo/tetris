export class Stack {
  public allBlocks: number[];

  constructor() {
    this.allBlocks = [];
  }

  push(position: number) {
    this.allBlocks.push(position);
  }
}
