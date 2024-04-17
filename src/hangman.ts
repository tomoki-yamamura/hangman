import rawData from "./data/questions.test.json";
import readlinePromiss from "readline/promises";
import chalk from "chalk";
import figlet from "figlet";

type Color = "red" | "green" | "yellow" | "white";

interface Question {
  word: string;
  hint: string;
}

const questions: Question[] = rawData;

interface UserInterface {
  input(): Promise<string>;
  clear(): void;
  destroy(): void;
  output(message: string, color?: Color): void;
  outputAnswer(message: string): void;
}

const rl = readlinePromiss.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const CLI: UserInterface = {
  async input() {
    const input = await rl.question("Guess the word or letter: ");
    return input.replaceAll(" ", "").toLowerCase();
  },

  clear() {
    console.clear();
  },

  destroy() {
    rl.close();
  },

  output(message: string, color: Color = "white") {
    console.log(chalk[color](message), "\n");
  },

  outputAnswer(message: string) {
    console.log(figlet.textSync(message, { font: "Big" }), "\n");
  },
};

async function testQuestion() {
  CLI.clear();
  const userinput = await CLI.input();
  console.log(userinput);
  CLI.destroy();
}

testQuestion();

class Quiz {
  questions: Question[];
  constructor(questions: Question[]) {
    this.questions = questions;
  }

  getNext(): Question {
    const idx = Math.floor(Math.random() * this.questions.length);
    const [question] = this.questions.splice(idx, 1);
    return question;
  }

  hasNext(): boolean {
    return this.questions.length > 0;
  }

  lefts(): number {
    return this.questions.length;
  }
}

class Stage {
  answer: string;
  leftAttempts: number = 5;
  question: Question;
  constructor(question: Question) {
    this.question = question;
    this.answer = new Array(question.word.length).fill("_").join("");
  }

  updateAnswer(userInput: string = ""): void {
    if (!userInput) return;
    const regex = new RegExp(userInput, "g");
    const answerArry = this.answer.split("");
    let matches: RegExpExecArray | null;
    while ((matches = regex.exec(this.question.word))) {
      const foundIdx = matches.index;
      answerArry.splice(foundIdx, userInput.length, ...userInput);
      this.answer = answerArry.join("");
    }
  }

  isTooLong(userInput: string): boolean {
    return userInput.length > this.question.word.length;
  }
  isIncludes(userInput: string): boolean {
    return this.question.word.includes(userInput);
  }
  isCorrect(): boolean {
    return this.answer === this.question.word;
  }

  decrementAttempts(): number {
    return --this.leftAttempts;
  }

  isGameOver(): boolean {
    return this.leftAttempts === 0;
  }
}

class Message {
  ui: UserInterface;
  constructor(ui: UserInterface) {
    this.ui = ui;
  }

  askQuestion(stage: Stage): void {
    this.ui.output(`Hint: ${stage.question.hint}`, "yellow");
    this.ui.outputAnswer(stage.answer.replaceAll("", " ").trim());
    this.ui.output(`(残りの試行回数: ${stage.leftAttempts})`);
  }
  leftQuestions(quiz: Quiz) {
    this.ui.output(`${quiz.lefts() + 1}s left`);
  }
  start() {
    this.ui.output("\nGame Start!!");
  }
  enterSomething() {
    this.ui.output(`Try input!`, "red");
  }
  notInclude(input: string) {
    this.ui.output(`word doesn't have "${input}" `, "red");
  }
  notCorrect(input: string) {
    this.ui.output(`"${input}" is wrong`, "red");
  }
  hit(input: string) {
    this.ui.output(`"${input}" is Hit!`, "green");
  }
  correct(question: Question) {
    this.ui.output(`The correct is "${question.word}" `, "green");
  }
  gameover(question: Question) {
    this.ui.output(`The correct is ${question.word}`);
  }
  end() {
    this.ui.output("Good game. Thank you!");
  }
}

const quiz = new Quiz(questions);
