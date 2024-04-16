import rawData from "./data/questions.test.json";
import readlinePromiss from "readline/promises"
import chalk from "chalk";
import figlet from "figlet"

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
})

const CLI: UserInterface = {
  async input() {
    const input = await rl.question("Guess the word or letter: ");
    return input.replaceAll(" ","").toLowerCase();
  },

  clear() {
    console.clear();
  },

  destroy() {
    rl.close()
  },

  output(message: string, color: Color = "white") {
    console.log(chalk[color](message), "\n");
  },

  outputAnswer(message: string) {
    console.log(figlet.textSync(message, { font: "Big"}), "\n");
  }
}

async function testQuestion() {
  CLI.clear();
  const userinput = await CLI.input()
  console.log(userinput);
  CLI.destroy()
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

const quiz = new Quiz(questions);
