import "./style.css";
import { initialize, draw, config, clearBoard } from "./utils/init";
import * as Blocks from "./utils/blocks";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

const startColumn = Math.floor(config.cols / 2) - 1;

let currentBlock = Blocks.iPiece(startColumn, 0);

function play() {
  clearBoard();
  draw(currentBlock);
  requestAnimationFrame(play);
}

playButton.addEventListener("click", play);
