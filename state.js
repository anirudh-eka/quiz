import { quizTemplate, nextQuestion } from "./quiz-template.js";
import { apo, Either } from "./fp.js";

export function addQuizAnswer(answeredQ, quiz) {
  return apo(([q, ...rest]) => {
    if (q === undefined) {
      return null;
    }
    if (q.question === answeredQ.question) {
      const nextQ = nextQuestion(answeredQ.question,answeredQ.answers);
      const left = nextQ === null ? [answeredQ] : [answeredQ, { question: nextQ }];
      return [rest, Either.Left(left)];
    }
    return [rest, Either.Right(q)];
  }, quiz);
}
export const initialQuiz = [quizTemplate.start];
