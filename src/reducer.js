import screens from "./screens/reference.js";
import Api from "./api.js";

export const initialState = {
  auth: {
    firstName: "",
    lastName: "",
  },
  currentQuestion: 1,
  currentScreen: screens.AUTH,
  answers: [],
  questions: [],
};

export const stateReducer = (state, action) => {
  let tmp = Object.assign({}, state);

  if (tmp.questions.length == 0) {
    let handler = (data) => {
      tmp.questions = data;
    };

    new Api().getQuestions(handler);
  }

  let end = () => {
    console.log(JSON.stringify(tmp.answers));
    let data = {
      auth: tmp.auth,
      answers: tmp.answers,
    };

    new Api().submitData(data);

    tmp.currentScreen = screens.ENDING;
  };

  switch (action.type) {
    case "SET_AUTH_INFO":
      tmp.auth = { ...tmp.auth, ...action.value };
      break;
    case "SET_CURRENT_SCREEN":
      tmp.currentScreen = action.value;
      break;
    case "SET_ANSWER":
      tmp.answers.push({
        id: tmp.currentQuestion,
        value: parseInt(action.value),
      });
      if (tmp.currentQuestion === tmp.questions.length) {
        end();
      }
      tmp.currentQuestion += 1;
      break;
  }

  return tmp;
};

