import { observable, action, makeObservable } from "mobx";
import { Question, Questiontype } from "../models";
import { v4 } from "uuid";

class ComponentsStore {
  componentsList: Question[] = [];
  constructor() {
    makeObservable(this, {
      componentsList: observable,
      addQustion: action,
      changeAnswer: action,
      addAnswer: action,
      removeAnswer: action,
      removeQustion: action,
      editQuestion: action,
    });
  }

  addQustion = (question: string, type: Questiontype) => {
    if (question.trim() !== "" && type === "boolean") {
      this.componentsList.push({
        id: v4(),
        question: question,
        type: type,
        choices: ["Правда", "Не правда"],
        correctAnswers: ["Правда"],
      });
    }
    if (question.trim() !== "" && type === "single") {
      this.componentsList.push({
        id: v4(),
        question: question,
        type: type,
        choices: [],
        correctAnswers: [],
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

  addAnswer = (id: string, answer: string) => {
    const question = this.componentsList.find((item) => item.id === id);
    if (question) {
      question.choices.push(answer);
    }
  };

  removeAnswer = (id: string, answer: string) => {
    const question = this.componentsList.find((item) => item.id === id);
    if (question) {
      question.choices = question.choices.filter((item) => item !== answer);

      if (
        typeof question.choices.find(
          (item) => item === question.correctAnswers[0]
        ) == "undefined"
      ) {
        question.correctAnswers = [];
      }
    }
  };

  changeAnswer = (id: string, answer: string) => {
    const question = this.componentsList.find((item) => item.id === id);

    if (question) {
      question.correctAnswers = [answer];
    }
  };
}

export default new ComponentsStore();
