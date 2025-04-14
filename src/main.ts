import "./style.css";
import { initialize, draw } from "./utils/init";
import { Block } from "./utils/blocks";
import { Stack } from "./utils/stack";
import {
  playButton,
  resetButton,
  scoreElement,
  leftButton,
  rightButton,
  rotateButton,
} from "./utils/divElements";

initialize();

let gameOver = true;
let now = 0;
let then = 0;
let speed = 1;
let score = 0;

let currentBlock: Block;
let stack: Stack;

let animationFrameId: any;

function reset() {
  cancelAnimationFrame(animationFrameId);
  gameOver = true;
  draw();
}

function start() {
  // reset the game
  cancelAnimationFrame(animationFrameId);
  gameOver = false;
  speed = 1;
  score = 0;
  stack = new Stack();
  now = Date.now();
  then = now;
  currentBlock = new Block();
  play();
}

function play() {
  then = Date.now();
  draw(currentBlock, stack);

  scoreElement.innerText = `${score}`;

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
      stack.checkRowsToBreak();
      stack.breakFullRows();

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
