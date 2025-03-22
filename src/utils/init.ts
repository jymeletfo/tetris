export const config = {
  unitSize: 30,
  rows: 20,
  cols: 16,
};

function initialize(scene: HTMLDivElement) {
  // create the tiles
  const tile = document.createElement("div");
  tile.style.width = `${config.unitSize}px`;
  tile.style.height = `${config.unitSize}px`;
  tile.classList.add("tile");

  // create the board
  scene.style.width = `${config.unitSize * config.cols}px`;
  scene.style.height = `${config.unitSize * config.rows}px`;
  scene.classList.add("board");

  for (let i = 0; i < config.rows * config.cols; i++) {
    scene.appendChild(tile.cloneNode(true));
  }
}

export { initialize };
