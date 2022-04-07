import axios from "axios";

export default class Api {
  constructor() {
    if (typeof Api.instance == "object") {
      return Api.instance;
    }

    Api.instance = this;

    return Api.instance;
  }

  getQuestions(delegate = () => {}) {
    axios.get(process.env.REACT_APP_URL + "/getQuestions").then((res) => {
      delegate(res.data);
    });
  }

  submitData(data, delegate = () => {}) {
    axios.post(process.env.REACT_APP_URL + "/submitData", data).then((res) => {
      delegate(res.data);
    });
  }
}
