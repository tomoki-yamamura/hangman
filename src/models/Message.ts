import { Question } from "../interfaces/Question";
import { Quiz } from "./Quiz";
import { Stage } from "./Stage";
import { UserInterface } from "../interfaces/UserUnterface";

export class Message {
  ui: UserInterface;

  constructor(ui: UserInterface) {
    this.ui = ui;
  }
  // 問題をユーザーに表示
  askQuestion(stage: Stage): void {
    this.ui.output(`Hint: ${stage.question.hint}`, "yellow");
    this.ui.outputAnswer(stage.answer.replaceAll("", " ").trim());
    this.ui.output(`You have ${stage.leftAttempts} attempts left`);
  }
  leftQuestions(quiz: Quiz) {
    this.ui.output(`${quiz.lefts() + 1} questions left`);
  }
  start() {
    this.ui.output("\nGame Start!!");
  }
  enterSomething() {
    this.ui.output(`Please enter some text.`, "red");
  }
  notInclude(input: string) {
    this.ui.output(`"${input}" is not included in the word`, "red");
  }
  notCorrect(input: string) {
    this.ui.output(`Too bad! "${input}" is not correct`, "red");
  }
  hit(input: string) {
    this.ui.output(`"${input}" Hit!`, "green");
  }
  correct(question: Question) {
    this.ui.output(`Correct! The word is "${question.word}"`, "green");
  }
  gameover(question: Question) {
    this.ui.output(`The answer is ${question.word}`);
  }
  end() {
    this.ui.output("Game is over! Thank you for your hard work!");
  }
}
