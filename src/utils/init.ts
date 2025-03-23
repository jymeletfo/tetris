export const config = {
  unitSize: 30,
  rows: 20,
  cols: 16,
};

const board: HTMLDivElement = document.getElementById("app") as HTMLDivElement;

// create the tiles
const tile = document.createElement("div");
tile.style.width = `${config.unitSize}px`;
tile.style.height = `${config.unitSize}px`;
tile.classList.add("tile");

function initialize() {
  // create the board
  board.style.width = `${config.unitSize * config.cols}px`;
  board.style.height = `${config.unitSize * config.rows}px`;
  board.classList.add("board");

  draw(null);
}

function clearBoard() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }
}

function draw(item: number[] | null) {
  for (let i = 0; i < config.rows * config.cols; i++) {
    if (item && item.includes(i)) {
      tile.classList.add("active");
    } else {
      tile.classList.remove("active");
    }
    board.appendChild(tile.cloneNode(true));
  }
}

export { initialize, draw, clearBoard };
