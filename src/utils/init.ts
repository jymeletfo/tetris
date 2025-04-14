import { Block } from "./blocks";
import { Stack } from "./stack";
import { board } from "./divElements";

export const config = {
  unitSize: window.innerWidth < 600 ? 25 : 30,
  rows: 20,
  cols: 16,
};

// create the tiles
const tile = document.createElement("div");
tile.style.width = `${config.unitSize}px`;
tile.style.height = `${config.unitSize}px`;
tile.classList.add("tile");

// create the taken blocks
const taken: HTMLDivElement = document.createElement("div");
taken.classList.add("invisible");
taken.classList.add("taken");

function initialize() {
  // create the board
  board.style.width = `${config.unitSize * config.cols}px`;
  board.style.height = `${config.unitSize * config.rows}px`;
  board.classList.add("board");

  draw();
}

function draw(item?: Block, stack?: Stack) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < config.rows * config.cols; i++) {
    if (item && item.getShape().includes(i - item.position)) {
      tile.classList.add("active");
    } else {
      tile.classList.remove("active");
    }

    if (stack && stack.allBlocks.includes(i)) {
      tile.classList.add("taken");
    } else {
      tile.classList.remove("taken");
    }

    fragment.appendChild(tile.cloneNode(true));
  }

  // create a row of taken blocks below the board
  for (let i = 0; i < config.cols; i++) {
    fragment.appendChild(taken.cloneNode(true));
  }

  board.replaceChildren(fragment);
}

// Get all the div children in the board
function getBoardChildren() {
  return Array.from(board.children) as HTMLDivElement[];
}

export { initialize, draw, getBoardChildren };
