# Quiz

An implementation of a contrived quiz flow that runs from the CLI. To run,
```
yarn start
```

The quiz template can be found in `./quiz-template.js`. The schema for a particular quiz question is:

```
 [FAVORITE_FRUITS]: {
    type: "checkbox",
    options: [MANGO, GRAPE, WATERMELLON],
    nextQuestion: {
      [MANGO]: KNIFE,
      [WATERMELLON]: KNIFE,
      [GRAPE]: FEELING,
      default: FEELING,
    }
  }
```

## `nextQuestion`

`nextQuestion` is the way the next question is mapped to an answer of the current question. 

### When Object

When `nextQuestion` is set to an object, the answers to the current question are the keys that are pair with the name of the succeeding question. So different answers can lead to different next questions.
```
 [FAVORITE_FRUITS]: {
    type: "checkbox",
    options: [MANGO, GRAPE, WATERMELLON],
    nextQuestion: {
      [MANGO]: KNIFE,
      [WATERMELLON]: KNIFE,
      [GRAPE]: FEELING,
      default: FEELING,
    }
  }
```
In the above you can see that if the user selects `MANGO` or `WATERMELLON` it will take them to the `KNIFE` question, otherwise they will go to `FEELING` question. In cases, where multiple answers can be selected as with a `"checkbox"` the next question priority is based on what's highest on the list. 

### When Function

When `nextQuestion` is set to a function, the function is executed to determine the next question. The signature is:
`(ans : [String]) -> String` 
The funtion will get an array of answers (regardless of if it is a checkbox or not) and must return one string which is a key to another question in the template.
```
[KNIFE]: {
    type: "input",
    options: NUMBER,
    nextQuestion: (ans) => {
      return ans.map(a => a > 4 ? BIG_KNIFE_WARNING : FEELING)[0];
    }
  },
```
The above sends the user to the `BIG_KNIFE_WARNING` when the answer is `> 4` and to `FEELING` otherwise.

### When String

When `nextQuestion` is set to a string, the string must be a key to another question in the template. Regardless of the answer, the next question will be that question.

```
  [LIVING_GOD]: {
    type: "list",
    options: [LIKE_GOD_STATUS, NOT_LIKE_GOD_STATUS],
    nextQuestion: FAVORITE_FRUITS
  },
```
Regardless of the answer selected, the next question will always be `FAVORITE_FRUITS`.

### When `null`

When `nextQuestion` is `null`, there is no more questions. 
