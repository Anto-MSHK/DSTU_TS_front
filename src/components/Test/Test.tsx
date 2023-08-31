import { Button, Card, Divider, Result, Row, Space, Spin } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useGetUserTestResultsByIdQuery } from "../../app/services/UserApi";
import { CriteriaT, CriteriasT, GroupT } from "../../app/Types/ResultsType";
import { TestT } from "../../app/Types/DirectionType";
import { Link } from "react-router-dom";
import useScreenWidth from "../../hooks/useScreenSize";

interface TestFC {
  id: number;
  title: string;
  desc: string;
  meta: TestT["meta"];
  questions: TestT["questions"];
}
export const Test: FC<TestFC> = ({ id, title, desc, meta, questions }) => {
  const widthSize = useScreenWidth();
  const mobileWidth = 600;

  const { data: results, isLoading: isResultsLoading } =
    useGetUserTestResultsByIdQuery(id);

  let [testDone, setTestDone] = useState<boolean>(false);
  let [curResult, setCurResult] = useState<React.ReactNode>(
    <h2>Тест не пройден</h2>
  );

  useEffect(() => {
    if (results) {
      let isGroups =
        results.groups &&
        meta?.decryptGroups &&
        meta?.decryptGroups?.length > 0;
      let isCriterias = results.criterias && results.groups?.length < 1;
      if (results.curInterpretation && results.byFormula) {
        setCurResult(
          <h1 style={{ margin: "0 0 10px 0", color: "#1677FF" }}>
            {results?.byFormula} б. - {results?.curInterpretation.text}
          </h1>
        );
      } else if (isGroups || isCriterias) {
        let curData = isGroups ? results.groups : results.criterias;

        const resultChartData = curData?.map((item: GroupT | CriteriasT) => {
          let curGroup = undefined;
          if (isGroups)
            curGroup = meta?.decryptGroups?.find(
              (gr) => gr.name === (item as GroupT).group
            );
          return {
            result: (item as CriteriasT).result || (item as GroupT).count,
            name:
              (item as CriteriasT)?.criteria?.name ||
              curGroup?.text ||
              "Неизвестный",
            id: (item as CriteriasT)?.criteria?.id || (item as GroupT).group,
          };
        });
        setCurResult(
          <Row
            style={{
              width: "100%",
              marginTop: -10,
              gap: 35,
            }}
          >
            {resultChartData
              .sort((a, b) => b.result - a.result)
              .map((item) => {
                return (
                  <Result
                    title={item.result}
                    style={{ padding: 0 }}
                    icon={null}
                    subTitle={item.name}
                  />
                );
              })}
          </Row>
        );
      }
    }
    if (results?.logs && questions) {
      let allAnswers = results?.logs
        ?.map((log) => log.answers.find((ans) => ans.isAnswer))
        .filter((el) => el !== undefined);
      setTestDone(allAnswers?.length === questions.length);
    }
  }, [meta?.decryptGroups, questions, results]);

  return (
    <Card
      title={
        <h4 style={{ whiteSpace: "break-spaces", margin: "0 0 10px 0" }}>
          {title}
        </h4>
      }
      style={{ minWidth: 250 }}
      key={id}
      headStyle={{ whiteSpace: "break-spaces", margin: "10px 0 0 0" }}
      extra={
        results &&
        widthSize > mobileWidth && (
          <Space>
            <p>{`${questions?.length} вопросов`}</p>
            <Link to={!testDone ? `/quiz/${id}` : "/tests"}>
              <Button type="primary" disabled={testDone}>
                {!results?.logs?.length || results?.logs?.length < 1
                  ? "Начать прохождение"
                  : !testDone
                  ? "Продолжить"
                  : "Пройдено"}
              </Button>
            </Link>
          </Space>
        )
      }
    >
      {results && widthSize < mobileWidth && (
        <Space style={{ marginTop: -10 }}>
          <p>{`${questions?.length} вопросов`}</p>
          <Link to={!testDone ? `/quiz/${id}` : "/tests"}>
            <Button type="primary" disabled={testDone}>
              {!results?.logs?.length || results?.logs?.length < 1
                ? "Начать прохождение"
                : !testDone
                ? "Продолжить"
                : "Пройдено"}
            </Button>
          </Link>
        </Space>
      )}
      <h3 style={{ fontWeight: 400, margin: 0 }}>{desc}</h3>
      <div>
        <h4 style={{ color: "#1677FF", margin: "15px 0 -10px 0" }}>
          Результаты:
        </h4>
        <Divider
          style={{
            margin: "15px 0 15px 0",
            backgroundColor: "#1677FF",
          }}
        />
        {!isResultsLoading ? curResult : <Spin size="large" />}
        <Divider
          style={{
            margin: "15px 0 15px 0",
            backgroundColor: "#1677FF",
          }}
        />
      </div>
    </Card>
  );
};
