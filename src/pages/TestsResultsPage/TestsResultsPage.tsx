import React, { useState } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Row, Segmented, Space, Spin } from "antd";
import { useGetAllTestsQuery } from "../../app/services/TestsApi";
import { Test } from "../../components/Test/Test";
import { useGetNewsQuery } from "../../app/services/NewsApi";
import { News } from "../../components/News/News";
import useScreenWidth from "../../hooks/useScreenSize";

export const TestsResultsPage = () => {
  const segmentOptions = ["Новости", "Тесты"];
  let [segment, setSegment] = useState("Тесты");
  const { data: allTests, isLoading: isLoadingAllTests } =
    useGetAllTestsQuery();
  const { data: news, isLoading: isNewsLoading } = useGetNewsQuery();
  const widthSize = useScreenWidth();
  const mobileWidth = 600;
  return (
    <MainLayout>
      <Space
        wrap
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 10,
          marginTop: widthSize > mobileWidth ? 0 : 10,
        }}
      >
        <Segmented
          size="large"
          options={segmentOptions}
          value={segment}
          onChange={(value) => setSegment(value.toString())}
        />
      </Space>
      {segment === "Тесты" ? (
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {!isLoadingAllTests && allTests ? (
            allTests.map((test) => (
              <Test
                id={test.id}
                title={test.name}
                desc={test.desc}
                meta={test.meta}
                questions={test.questions}
              />
            ))
          ) : (
            <Spin size="large" style={{ width: "100%" }} />
          )}
        </Space>
      ) : (
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          {!isNewsLoading && news ? (
            news.map((news) => (
              <News
                id={news.id}
                title={news.title}
                text={news.text}
                updatedAt={news.updatedAt}
              />
            ))
          ) : (
            <Spin size="large" style={{ width: "100%" }} />
          )}
        </Space>
      )}
    </MainLayout>
  );
};
