import { unfoldAsync, find } from "./fp.js";
import { ask } from "./io.js";
import { addQuizAnswer, initialQuiz } from "./state.js";

const unansweredQ = (q) => q.answers == null || q.answers == undefined;


function run() {
  unfoldAsync(async (quiz) => {
    const nextQuestion = find(unansweredQ, quiz)
    if (nextQuestion === null) {
      return null
    }
    const {question, answers} = await ask(nextQuestion);
    const newQuiz = addQuizAnswer({question, answers}, quiz)
    return [newQuiz, ];
  }, initialQuiz)
}

run()
