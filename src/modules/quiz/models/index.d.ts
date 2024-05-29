import { FC } from "react";

export type QuestionType = "single" | "multiple" | "boolean";

export type Question = {
  id: string;
  question: string;
  type: QuestionType;
  choices: string[];
  correctAnswers: string[];
  score?: number;
};

export type Topic = {
  topic: string;
  totalQuestions?: number;
  totalScore?: number;
  totalTime?: number;
  questions: Question[];
};

export type IQuestion = {
  id: string;
  title: string;
  choices: string[];
  correctAnswers: string[];
  type: QuestionType;
};
