import { AnswerT } from "./DirectionType";

export type ResultsT = {
  testInfo: {
    id: number;
    name: string;
    desc: string;
    wayId: number;
    createdAt: string;
    updatedAt: string;
  };
  result: {
    id: number;
    byCriteria: null;
    answersLog: null;
    userId: number;
    testId: number;
    createdAt: string;
    updatedAt: string;
  };
};

export type CriteriaT = {
  id: number;
  name: string;
};
export type CriteriasT = {
  criteria: CriteriaT;
  result: number;
};
export type GroupT = {
  group: string;
  count: number;
};

export type QuestionLogT = {
  text: string;
  type: string;
  answers: AnswerLogT[];
};

export type AnswerLogT = {
  id: number;
  text: string;
  criteria: CriteriaT;
  answers: AnswerT[];
};

export type ResultByIdT = {
  criterias: CriteriasT[];
  groups: GroupT[];
  /*  "criterias": [
    {
      "criteria": [
        {
          "id": 2,
          "name": "человек-техника"
        }
      ],
      "result": 12
    }
  ], */
  logs: AnswerLogT[];
  byFormula: number;
  curInterpretation: {
    value: string[];
    text: string;
  };
  /* "logs": [
    {
      "question": {
        "text": "Ты чел?...",
        "type": "string",
        "answers": [
          {
            "id": 2,
            "text": "Да, я чел",
            "criteria": {
              "id": 2,
              "name": "человек-техника"
            }
          }
        ]
      },
      "answers": [
        {
          "id": 2,
          "text": "Да, я чел",
          "criteria": {
            "id": 2,
            "name": "человек-техника"
          }
        }
      ]
    }
  ] */
};
