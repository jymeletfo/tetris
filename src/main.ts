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
let currentRotation: 0 | 1 | 2 | 3;
let currentBlock: number[];

function reset() {
  currentRow = -1;
  currentColumn = startColumn;
  currentRotation = 0;
  currentBlock = Blocks.iPiece(
    currentRow * config.rows + currentColumn,
    currentRotation
  );

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
    currentBlock = Blocks.iPiece(
      currentRow * config.cols + currentColumn,
      currentRotation
    );
  }

  requestAnimationFrame(play);
}

reset();
playButton.addEventListener("click", play);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      if (currentColumn > 0) currentColumn -= 1;
      break;
    case "ArrowRight":
      if (currentColumn < config.cols - 1) currentColumn += 1;
      break;
    case "Space":
      if (currentRotation < 3) currentRotation += 1;
      else currentRotation = 0;
  }

  currentBlock = Blocks.iPiece(
    currentRow * config.cols + currentColumn,
    currentRotation
  );
  draw(currentBlock);
});
