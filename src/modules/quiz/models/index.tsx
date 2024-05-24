import { FC } from "react";

export type Questiontype = "single" | "multiple" | "boolean";

export type Question = {
  question: string;
  choices: string[];
  type: Questiontype;
  correctAnswers: string[];
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
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export type QuestionComponents = {
  id: string;
  title: string;
  type: Questiontype;
  Component: FC<IBooleanQuestion>;
};
