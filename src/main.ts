import "./style.css";
import { initialize, draw, config, clearBoard } from "./utils/init";
import { Block } from "./utils/blocks";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

let now = 0;
let then = 0;

let currentBlock: Block;

function reset() {
  currentBlock = new Block("i");
  // cancel animation frame
}

function play() {
  then = Date.now();
  clearBoard();
  draw(currentBlock);

  if (Date.now() - now > 1000) {
    now = then;

    // update the block
    currentBlock.goDown();
  }

  requestAnimationFrame(play);
}

reset();
playButton.addEventListener("click", play);

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      currentBlock.goLeft();
      break;
    case "ArrowRight":
      currentBlock.goRight();
      break;
    case "Space":
      currentBlock.rotate();
      break;
    default:
      draw(currentBlock);
      break;
  }
});
