import "./style.css";
import { initialize, draw } from "./utils/init";
import { Block } from "./utils/blocks";
import { Stack } from "./utils/stack";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

let gameOver = true;
let now = 0;
let then = 0;
let speed = 1;

let currentBlock: Block;
let stack: Stack;

function reset() {
  gameOver = true;
  currentBlock = new Block();

  // TODO: cancel animation frame
}

function start() {
  stack = new Stack();
  now = Date.now();
  then = now;
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

  requestAnimationFrame(play);
}

reset();
playButton.addEventListener("click", () => {
  if (gameOver) start();
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      currentBlock.goLeft();
      break;
    case "ArrowRight":
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
