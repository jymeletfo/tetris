import "./style.css";
import { initialize, draw } from "./utils/init";
import { Block } from "./utils/blocks";
import { Stack } from "./utils/stack";
import {
  playButton,
  resetButton,
  leftButton,
  rightButton,
  rotateButton,
} from "./utils/divElements";
import { createTimer, Timer } from "animejs";
import eventEmitter from "./utils/eventEmitter";
import Score from "./utils/score";

initialize();

let gameOver = true;
let speed = 1;
let score: Score = new Score();

let currentBlock: Block;
let stack: Stack;

let gameAnimation: Timer = createTimer({
  duration: 1000,
  loop: true,
  frameRate: speed,
  onBegin: () => {
    gameOver = false;
    speed = 1;
    stack = new Stack();
    currentBlock = new Block();
  },
  onUpdate: () => {
    draw(currentBlock, stack);
    if (!currentBlock.checkCollision()) {
      currentBlock.goDown();
    } else {
      // check if the game is over
      if (stack.allBlocks.includes(currentBlock.position)) {
        alert("Game Over!");
        reset();
        return;
      }
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
  gameAnimation.reset();
  score.reset();
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

eventEmitter.on("pause", (pause: boolean) => {
  if (pause) {
    gameAnimation.pause();
  } else {
    gameAnimation.play();
  }
});

eventEmitter.on("rowsDeleted", (noOfRows: number) => {
  score.update(noOfRows);
});
