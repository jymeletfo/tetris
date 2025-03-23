import "./style.css";
import { initialize, draw } from "./utils/init";
import * as Blocks from "./utils/blocks";

const playButton: HTMLButtonElement = document.getElementById(
  "play"
) as HTMLButtonElement;

initialize();

let currentBlock = Blocks.square(0, 0);
