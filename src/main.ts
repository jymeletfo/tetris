import "./style.css";
import { initialize, draw } from "./utils/init";
import { Block } from "./utils/blocks";
import { Stack } from "./utils/stack";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

let now = 0;
let then = 0;
let speed = 8;

let currentBlock: Block;
let stack: Stack;

function reset() {
  currentBlock = new Block("i");
  // cancel animation frame
}

function start() {
  stack = new Stack();
  now = Date.now();
  then = now;
  play();
}

function play() {
  then = Date.now();
  draw(currentBlock, stack);

  if (then - now > 1000 / speed) {
    now = then;

    // update the block
    if (!currentBlock.checkCollision()) {
      currentBlock.goDown();
    } else {
      // add the block to the stack
      for (let i = 0; i < currentBlock.getShape().length; i++) {
        stack.push(currentBlock.getShape()[i] + currentBlock.position);
      }

      // stack.push(currentBlock.position);

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
      draw(currentBlock, stack);
      break;
  }
});
