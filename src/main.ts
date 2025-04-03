import "./style.css";
import { initialize, draw } from "./utils/init";
import { Block } from "./utils/blocks";
import { Stack } from "./utils/stack";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;
const resetButton: HTMLButtonElement = document.getElementById(
  "reset"
) as HTMLButtonElement;

initialize();

let gameOver = true;
let now = 0;
let then = 0;
let speed = 1;

let currentBlock: Block;
let stack: Stack;

let animationFrameId: any;

function reset() {
  cancelAnimationFrame(animationFrameId);
  gameOver = true;
  draw();
}

function start() {
  stack = new Stack();
  now = Date.now();
  then = now;
  currentBlock = new Block();
  play();
}

function play() {
  gameOver = false;
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

      currentBlock = new Block();
    }
  }

  animationFrameId = requestAnimationFrame(play);
}

reset();

playButton.addEventListener("click", () => {
  if (gameOver) start();
});

resetButton.addEventListener("click", () => {
  reset();
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      // check if there is a taken tile on the left before moving the current block
      for (let i = 0; i < currentBlock.getShape().length; i++) {
        if (
          stack.allBlocks.includes(
            currentBlock.getShape()[i] + currentBlock.position - 1
          )
        )
          return;
      }
      currentBlock.goLeft();
      break;
    case "ArrowRight":
      // check if there is a taken tile on the right before moving the current block
      for (let i = 0; i < currentBlock.getShape().length; i++) {
        if (
          stack.allBlocks.includes(
            currentBlock.getShape()[i] + currentBlock.position + 1
          )
        )
          return;
      }
      currentBlock.goRight();
      break;
    case "ArrowDown":
      if (currentBlock.checkCollision()) return;
      currentBlock.goDown();
      break;
    case "Space":
      currentBlock.rotate();
      break;
    default:
      draw(currentBlock, stack);
      break;
  }
});
