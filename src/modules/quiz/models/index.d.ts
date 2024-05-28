import { FC } from "react";

export type Questiontype = "single" | "multiple" | "boolean";

export type Question = {
  id: string;
  question: string;
  type: Questiontype;
  choices?: string[];
  correctAnswers?: string[];
  score?: number;
};

export type Topic = {
  topic: string;
  level: string;
  totalQuestions: number;
  totalScore: number;
  totalTime: number;
  questions: Question[];
};

export type IBooleanQuestion = {
  id: string;
  title: string;
};

export type QuestionComponents = {
  id: string;
  title: string;
  type: Questiontype;
};
