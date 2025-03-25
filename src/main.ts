import "./style.css";
import { initialize, draw, config, clearBoard } from "./utils/init";
import * as Blocks from "./utils/blocks";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

const startColumn = Math.floor(config.cols / 2) - 1;

let now = 0;
let then = 0;

// block position
let currentRow: number;
let currentColumn: number;
let currentBlock: number[];

function reset() {
  currentRow = 0;
  currentColumn = startColumn;
  currentBlock = Blocks.iPiece(currentRow * config.rows + currentColumn, 0);

  // cancel animation frame
}

function play() {
  then = Date.now();
  clearBoard();
  draw(currentBlock);

  if (Date.now() - now > 1000) {
    now = then;

    // update the block
    currentRow += 1;
    currentBlock = Blocks.iPiece(currentRow * config.cols + currentColumn, 0);
  }

  requestAnimationFrame(play);
}

reset();

playButton.addEventListener("click", play);
