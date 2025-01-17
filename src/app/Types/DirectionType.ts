import { string } from "yup";

export type AnswerT = {
  id: number;
  text: string;
  isAnswer?: boolean;
};
export type QuestionT = {
  id: number;
  text: string;
  type: string;
  answers: AnswerT[];
};
export type TestT = {
  id: number;
  name: string;
  desc: string;
  meta: {
    decryptGroups: { name: string; text: string }[];
  };
  questions: QuestionT[];
};
export type NewsT = {
  title: string;
  text: string;
  id: number;
  updatedAt: string;
};

export type WaysT = {
  id: number;
  name: string;
  desc: string;
  tests: TestT[];
};

export type InfoT = {
  id: number;
  name: string;
  value: string;
};
export type DirectionT = {
  id: number;
  title: string;
  desc: string;
  infos: InfoT[];
  ways: WaysT[];
};
