import { scoreElement } from "./divElements";

class Score {
  private mainPointAdded: number = 100;
  private bonusPointAdded: number = 25;
  private score: number = 0;
  private scoreElement: HTMLDivElement = scoreElement;

  constructor() {
    this.display();
  }

  update(noOfLinesBrokenAtOnce: number) {
    if (noOfLinesBrokenAtOnce > 1) {
      this.score +=
        (this.mainPointAdded + this.bonusPointAdded) * noOfLinesBrokenAtOnce;
    } else {
      this.score += this.mainPointAdded;
    }
    this.display();
  }

  display() {
    this.scoreElement.innerText = `${this.score}`;
  }

  get() {
    return this.score;
  }

  reset() {
    this.score = 0;
    this.display();
  }
}
export default Score;
