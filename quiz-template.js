const AGE = "How old are you?";
const JESUS_YEAR = "33";
const NOT_JESUS_YEAR = "not 33";
const LIVING_GOD = "Do you like being a living god?";
const LIKE_GOD_STATUS = "Yeah, I like being a living God";
const NOT_LIKE_GOD_STATUS = "No, too much pressure";
const FAVORITE_FRUITS = "What's your favorite fruits?";
const KNIFE = "Preferred knife size in inches:";
const MANGO = "🥭";
const GRAPE = "🍇";
const WATERMELLON = "🍉";
const FEELING = "How are you feeling?";
const NUMBER = "NUMBER";
const BIG_KNIFE_WARNING = "Your knife is big";
const HAPPY = "😀";
const SAD = "😢";

export const quizTemplate = {
  start: {
    question: AGE, 
  },
  [AGE]: {
    type: "list",
    options: [JESUS_YEAR, NOT_JESUS_YEAR],
    nextQuestion: {
      [JESUS_YEAR]: LIVING_GOD,
      [NOT_JESUS_YEAR]: FAVORITE_FRUITS,
    }
    // nextQuestion: (ans) => {
    //   const mapping = {
    //     [JESUS_YEAR]: LIVING_GOD,
    //     [NOT_JESUS_YEAR]: FAVORITE_FRUITS,
    //   };
    //   return Object.keys(mapping)
    //     .reverse()
    //     .reduce((a, k) => ans.includes(k) ? mapping[k] : a, FEELING);
    // }
  },
  [LIVING_GOD]: {
    type: "list",
    options: [LIKE_GOD_STATUS, NOT_LIKE_GOD_STATUS],
    nextQuestion: FAVORITE_FRUITS
    // nextQuestion: (ans) => {
    //   const mapping = {
    //     [LIKE_GOD_STATUS]: FAVORITE_FRUITS,
    //     [NOT_LIKE_GOD_STATUS]: FAVORITE_FRUITS,
    //   };
    //   return Object.keys(mapping)
    //     .reverse()
    //     .reduce((a, k) => ans.includes(k) ? mapping[k] : a, FEELING);
    // }
  },
  [FAVORITE_FRUITS]: {
    type: "checkbox",
    options: [MANGO, GRAPE, WATERMELLON],
    nextQuestion: {
      [MANGO]: KNIFE,
      [WATERMELLON]: KNIFE,
      [GRAPE]: FEELING,
      default: FEELING,
    }
    // nextQuestion: (ans) => {
    //   const mapping = {
    //     [MANGO]: KNIFE,
    //     [WATERMELLON]: KNIFE,
    //     [GRAPE]: FEELING,
    //     default: FEELING,
    //   };

    //   return Object.keys(mapping)
    //     .reverse()
    //     .reduce((a, k) => ans.includes(k) ? mapping[k] : a, FEELING);
    // }
  },
  [KNIFE]: {
    type: "input",
    options: NUMBER,
    nextQuestion: (ans) => {
      return ans.map(a => a > 4 ? BIG_KNIFE_WARNING : FEELING)[0];
    }
  },
  [BIG_KNIFE_WARNING]: {
    type: "confirm",
    // no answer question
    nextQuestion: FEELING
  },
  [FEELING]: {
    type: "list",
    options: [HAPPY, SAD],
    nextQuestion: null
  }
};


export function nextQuestion(question, answers) {
  const nextQuestionConfig = quizTemplate[question].nextQuestion;

  if(nextQuestionConfig === null) {
    return null
  }

  if(typeof nextQuestionConfig === "object") {
    return Object.keys(nextQuestionConfig)
      .reverse()
      .reduce((a, k) => answers.includes(k) ? nextQuestionConfig[k] : a, nextQuestionConfig.default);
  }

  if(typeof nextQuestionConfig === "function") { 
    return nextQuestionConfig(answers);
  }

  if(typeof nextQuestionConfig === "string") { 
    return nextQuestionConfig
  }

  throw new Error("Invalid nextQuestion");
}
