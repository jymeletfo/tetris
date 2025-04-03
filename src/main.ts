import "./style.css";
import { initialize, draw, clearBoard } from "./utils/init";
import { Block } from "./utils/blocks";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

let now = 0;
let then = 0;
let speed = 1;

let currentBlock: Block;

function reset() {
  currentBlock = new Block("i");
  // cancel animation frame
}

function start() {
  now = Date.now();
  then = now;
  play();
}

function play() {
  then = Date.now();
  clearBoard();
  draw(currentBlock);

  if (then - now > 1000 / speed) {
    now = then;

    // update the block
    if (!currentBlock.checkCollision()) {
      currentBlock.goDown();
    } else {
      currentBlock = new Block("i");
    }
  }

  requestAnimationFrame(play);
}

reset();
playButton.addEventListener("click", start);

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
