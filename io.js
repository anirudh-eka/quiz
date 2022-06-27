import inquirer from "inquirer";
import { quizTemplate } from "./quiz-template.js";

export async function ask(unansweredQ) {
  return await inquirer.prompt(questionsToPrompt([unansweredQ])).then((result) => {
    const question = Object.keys(result)[0];
    const answers = [result[question]].flat();
    return { question, answers };
  });
}

function questionsToPrompt(qs) {
  return qs.map(({question}) => ({
    type: quizTemplate[question].type, 
    name: question,
    message: question,
    choices: quizTemplate[question].options,
  }))
}
