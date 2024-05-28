import { observable, action, makeObservable } from "mobx";
import { Question, Questiontype } from "../models";
import { v4 } from "uuid";

class ComponentsStore {
  componentsList: Question[] = [];
  constructor() {
    makeObservable(this, {
      componentsList: observable,
      addQustion: action,
      removeQustion: action,
      editQuestion: action,
    });
  }

  addQustion = (question: string, type: Questiontype) => {
    if (question.trim() !== "") {
      this.componentsList.push({
        id: v4(),
        question: question,
        type: type,
      });
    }
  };

  removeQustion = (id: string) => {
    this.componentsList = this.componentsList.filter((item) => item.id !== id);
  };

  editQuestion = (id: string, title: string) => {
    const question = this.componentsList.find((item) => item.id === id);
    if (question) {
      question.question = title;
    }
  };
}

export default new ComponentsStore();
