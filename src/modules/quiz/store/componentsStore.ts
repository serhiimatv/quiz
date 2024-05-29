import { observable, action, makeObservable } from "mobx";
import { Question, QuestionType } from "../models";
import { v4 } from "uuid";

class ComponentsStore {
  questionList: Question[] = [];
  constructor() {
    makeObservable(this, {
      questionList: observable,
      addQuestion: action,
      changeAnswer: action,
      addAnswer: action,
      addMultipleAnswer: action,
      removeAnswer: action,
      removeQuestion: action,
      editQuestion: action,
      erseQuestion: action,
    });
  }

  // подумати над рефакторингом
  addQuestion = (question: string, type: QuestionType) => {
    if (question.trim() !== "" && type === "boolean") {
      this.questionList.push({
        id: v4(),
        question: question,
        type: type,
        choices: ["Правда", "Не правда"],
        correctAnswers: ["Правда"],
      });
    }
    if ((question.trim() !== "" && type === "single") || type === "multiple") {
      this.questionList.push({
        id: v4(),
        question: question,
        type: type,
        choices: [],
        correctAnswers: [],
      });
    }
  };

  removeQuestion = (id: string) => {
    this.questionList = this.questionList.filter((item) => item.id !== id);
  };

  editQuestion = (id: string, title: string) => {
    const question = this.questionList.find((item) => item.id === id);
    if (question) {
      question.question = title;
    }
  };

  addAnswer = (id: string, answer: string) => {
    const question = this.questionList.find((item) => item.id === id);
    if (question) {
      question.choices.push(answer);
    }
  };

  removeAnswer = (id: string, answer: string) => {
    const question = this.questionList.find((item) => item.id === id);
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
    const question = this.questionList.find((item) => item.id === id);

    if (question) {
      question.correctAnswers = [answer];
    }
  };

  addMultipleAnswer = (id: string, answer: string) => {
    const question = this.questionList.find((item) => item.id === id);

    if (question) {
      if (question.correctAnswers.find((item) => item === answer)) {
        question.correctAnswers = question.correctAnswers.filter(
          (item) => item !== answer
        );
      } else {
        question.correctAnswers.push(answer);
      }
    }
  };

  erseQuestion = () => {
    this.questionList = [];
  };
}

export default new ComponentsStore();
