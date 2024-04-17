import rawData from "./data/questions.test.json";
import { CLI } from "./utils/CLI";
import { Question } from "./interfaces/Question";
import { Game } from "./models/Game";
import { Message } from "./models/Message";
import { Quiz } from "./models/Quiz";

const questions: Question[] = rawData
const quiz = new Quiz(questions);
const message = new Message(CLI);
const game = new Game(quiz, message, CLI);

game.start();
