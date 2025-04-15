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
import { createTimer, Timer } from "animejs";

initialize();

let gameOver = true;
let now = 0;
let then = 0;
let speed = 1;
let score = 0;

let currentBlock: Block;
let stack: Stack;

let gameAnimation: Timer = createTimer({
  duration: 1000,
  loop: true,
  frameRate: speed,
  onBegin: () => {
    gameOver = false;
    speed = 1;
    score = 0;
    stack = new Stack();
    currentBlock = new Block();
  },
  onUpdate: () => {
    draw(currentBlock, stack);
    scoreElement.innerText = `${score}`;
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
  },
});

function reset() {
  // cancelAnimationFrame(animationFrameId);
  gameAnimation.reset();
  gameOver = true;
  draw();
}

function start() {
  gameAnimation.play();
}

reset();

playButton.addEventListener("click", () => {
  if (gameOver) start();
});

resetButton.addEventListener("click", () => {
  reset();
});

function rightAction() {
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
  draw(currentBlock, stack);
}

function leftAction() {
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
  draw(currentBlock, stack);
}

function rotateAction() {
  currentBlock.rotate();
  draw(currentBlock, stack);
}

/**
 * Add player actions
 */
window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      leftAction();
      break;
    case "ArrowRight":
      rightAction();
      break;
    case "ArrowDown":
      if (currentBlock.checkCollision()) return;
      currentBlock.goDown();
      draw(currentBlock, stack);
      break;
    case "Space":
      rotateAction();
      break;
    default:
      draw(currentBlock, stack);
      break;
  }
});

leftButton.addEventListener("click", leftAction);

rightButton.addEventListener("click", rightAction);
rotateButton.addEventListener("click", rotateAction);
