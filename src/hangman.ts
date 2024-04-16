import rawData from "./data/questions.test.json";

interface Question {
  word: string;
  hint: string;
}

const questions: Question[] = rawData;

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
