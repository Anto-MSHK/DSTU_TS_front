import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  Divider,
  Empty,
  Input,
  Menu,
  message,
  Modal,
  Progress,
  Result,
  Row,
  Segmented,
  Space,
  Spin,
  Tag,
  theme,
  Typography,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts/MainLayout";
import { DirectionT, NewsT } from "../../app/Types/DirectionType";
import { MenuProps } from "rc-menu";
import { DeleteOutlined, InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetUserTestResultsByIdQuery } from "../../app/services/UserApi";
import {
  useAddCriteriaMutation,
  useGetAllTestsQuery,
  useGetTestByIdQuery,
  useGetTestCriteriasQuery,
} from "../../app/services/TestsApi";
import { ResultsT } from "../../app/Types/ResultsType";
import {
  useAddNewsMutation,
  useDeleteNewsMutation,
  useGetNewsQuery,
} from "../../app/services/NewsApi";
import { NewsComponent } from "../../components/NewsComponent/NewsComponent";
const { Text } = Typography;

interface VacancyWindowI {
  data?: DirectionT[] | ResultsT[];
  withNav?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isPlainUser?: boolean;
}
type MenuItem = Required<MenuProps>["items"][number];

export const TestsResult: FC<VacancyWindowI> = ({
  data,
  isLoading,
  isError,
  isPlainUser = false,
}) => {
  const { id } = useParams();
  const [activeElement, setActiveElement] = useState("");
  const [skip, setSkip] = useState(true);
  const [skipCriteriaReq, setSkipCriteriaReq] = useState(true);
  const {
    data: testData,
    isLoading: isTestsLoading,
    isFetching: isTestsFetching,
  } = useGetUserTestResultsByIdQuery(activeElement, {
    skip,
  });
  const { data: allTests, isLoading: isLoadingTests } = useGetAllTestsQuery();
  const { data: test, isFetching: isFetTest } = useGetTestByIdQuery(
    activeElement,
    {
      skip,
    }
  );
  const { data: testCriterias } = useGetTestCriteriasQuery(activeElement, {
    skip: skipCriteriaReq,
  });
  const [selectedNews, setSelectedNews] = useState<NewsT | undefined>(
    undefined
  );
  const { data: news, isLoading: isNewsLoading } = useGetNewsQuery();

  const resultChartData = testData?.criterias.map((item) => {
    if (test?.questions) {
      return {
        result: item.result,
        name: item.criteria.name,
        id: item.criteria.id,
      };
    } else
      return {
        result: 0,
        name: item.criteria.name,
        id: item.criteria.id,
      };
  });
  const resultGroupData = testData?.groups.map((item) => {
    return {
      result: item.count,
      name: item.group,
      id: item.group,
    };
  });
  const [addCriteria] = useAddCriteriaMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [criteriaName, setCriteriaName] = useState("");

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[],
    desc?: string,
    type?: "group"
  ): MenuItem {
    return {
      key,
      children,
      label,
      type,
      desc,
    } as MenuItem;
  }
  const items: MenuProps["items"] = getMenuItmes();
  const onClick: MenuProps["onClick"] = (e) => {
    if (selectedOption !== "Новости") {
      setSkip(false);
      setActiveElement(e.key);
      !isPlainUser && setSkipCriteriaReq(false);
    } else {
      const selectedNewsId = e.key.replace("news", "");
      const selectedNewsItem =
        news &&
        news.find((item) => item.id && item.id.toString() === selectedNewsId);
      setSelectedNews(selectedNewsItem);
    }
  };

  function getMenuItmes() {
    if (!isPlainUser) {
      let adminData: DirectionT[] = data as DirectionT[];
      return adminData?.map((item) => {
        let ways = item.ways.map((way) => {
          let tests = way.tests.map((test) => {
            return getItem(test.name, test.id);
          });
          return getItem(way.name, `way${way.id}`, tests);
        });
        return getItem(item.title, `dir${item.id}`, ways);
      });
    } else {
      let userData = allTests;
      return userData?.map((item) => {
        return getItem(item.name, item.id);
      });
    }
  }

  const newsItems =
    news &&
    news.map((item) => {
      return getItem(item.title, `news${item.id}`);
    });

  function getNewsItems() {
    return newsItems;
  }

  const handleAddCriteria = () => {
    if (!activeElement || !criteriaName) return;
    addCriteria({
      id: activeElement,
      name: criteriaName,
    })
      .then((data) => {
        if (data) {
          message.success("Критерий успешно добавлен!");
          setIsModalOpen(false);
          setCriteriaName("");
        }
      })
      .catch((e) => {
        if (e) {
          message.error("Ошибка добавления критерия!");
        }
      });
  };

  const [selectedOption, setSelectedOption] = useState(
    !isPlainUser ? "Новости" : "Тесты"
  );
  useEffect(() => {
    setSelectedOption(!isPlainUser ? "Новости" : "Тесты");
  }, [isPlainUser]);

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
    setActiveElement("");
  };

  let testDone = false;
  if (test)
    testDone =
      testData?.logs
        .map((log) => log.answers.find((ans) => ans.isAnswer))
        .filter((el) => el !== undefined).length === test.questions.length;
  return (
    <MainLayout>
      <div style={{ display: "flex" }}>
        {isError && !isLoading && (
          <Card
            style={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Empty
              style={{ margin: "0 auto" }}
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={<span>Ошибка загрузки!</span>}
            ></Empty>
          </Card>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {!isPlainUser && (
            <Segmented
              options={["Новости", "Тесты"]}
              onChange={handleOptionChange}
            />
          )}
          {items?.length ? (
            <Menu
              onClick={onClick}
              style={{
                width: "300px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: 10,
                minHeight: 250,
              }}
              mode="inline"
              items={selectedOption === "Новости" ? getNewsItems() : items}
            />
          ) : (
            <Card loading={isLoading} style={{ width: "300px" }}>
              <Spin size="large" style={{ width: "100%" }} />
            </Card>
          )}
        </div>
        {selectedOption === "Новости" ? (
          <NewsComponent
            selectedNews={selectedNews}
            setSelectedNews={setSelectedNews}
            setActiveElement={setActiveElement}
          />
        ) : activeElement && !isTestsLoading && !isFetTest ? (
          <Card
            title={test?.name}
            extra={
              <>
                {test && (
                  <Space>
                    <p>{`${test.questions.length} вопросов`}</p>
                    <Link to={!testDone ? `/quiz/${activeElement}` : "/tests"}>
                      <Button type="primary" disabled={testDone}>
                        {!testData?.logs?.length || testData?.logs?.length < 1
                          ? "Начать прохождение"
                          : !testDone
                          ? "Продолжить"
                          : "Пройдено"}
                      </Button>
                    </Link>
                  </Space>
                )}
              </>
            }
            loading={isTestsLoading}
            style={{
              marginLeft: "20px",
              width: "100%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            bodyStyle={{
              padding: 30,
            }}
          >
            <Text strong>Описание: {test?.desc}</Text>

            {testData && testData?.logs && (
              <>
                <h4 style={{ color: "#1677FF", margin: "15px 0 -10px 0" }}>
                  Результаты{!testDone ? " (предварительные)" : ""}:
                </h4>
                <Divider
                  orientation="left"
                  style={{
                    margin: "15px 0 15px 0",
                    backgroundColor: "#1677FF",
                  }}
                ></Divider>
                {test &&
                !test?.meta?.decryptGroups &&
                testData?.curInterpretation &&
                testData.groups.length > 0 ? (
                  <>
                    <h1 style={{ margin: "0 0 10px 0", color: "#1677FF" }}>
                      {testData?.byFormula} б. -{" "}
                      {testData?.curInterpretation.text}
                    </h1>
                  </>
                ) : !testData && isTestsLoading ? (
                  <Spin />
                ) : (
                  testData && !testData?.curInterpretation && <></>
                )}

                {!test?.meta?.decryptGroups &&
                !isTestsLoading &&
                !testData?.curInterpretation &&
                resultChartData?.length &&
                isPlainUser ? (
                  <Space
                    style={{
                      width: "100%",
                      justifyContent: "space-between",
                      marginTop: -10,
                      gap: 25,
                    }}
                    align="center"
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
                  </Space>
                ) : resultGroupData?.length && isPlainUser ? (
                  <Space
                    style={{
                      width: "100%",
                      justifyContent: "start",
                      gap: 25,
                      marginTop: -10,
                    }}
                    align="center"
                  >
                    {test?.meta?.decryptGroups &&
                      resultGroupData
                        .sort((a, b) => b.result - a.result)
                        .map((item) => {
                          return (
                            <Result
                              title={item.result}
                              style={{ padding: 0 }}
                              icon={null}
                              subTitle={
                                test?.meta.decryptGroups.find(
                                  (gr) => gr.name === item.name
                                )?.text
                              }
                            />
                          );
                        })}
                  </Space>
                ) : (
                  "Вы ещё не прошли этот тест"
                )}

                <Divider
                  style={{
                    backgroundColor: "#1677FF",
                    margin: "15px 0 0 0",
                  }}
                />
              </>
            )}
            {!isPlainUser && (
              <div style={{ marginTop: "25px" }}>
                <Text strong>Критерии теста:</Text>
                <Space style={{ display: "flex", marginTop: "20px" }}>
                  {testCriterias?.length &&
                    testCriterias.map((item) => {
                      return (
                        <Tag
                          color="blue"
                          style={{
                            width: "fit-content",
                            height: 35,
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <h3 style={{ margin: "5px 0px 5px 0px" }}>
                            {item.name}
                          </h3>
                        </Tag>
                      );
                    })}
                  <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                    icon={<PlusOutlined />}
                  />
                </Space>
                <Space style={{ marginTop: "50px" }}>
                  <Link to={`/quiz/${activeElement}`}>
                    <Button type="primary">Открыть тест</Button>
                  </Link>
                  <Button style={{ margin: "0 0 auto" }}>Список ответов</Button>
                  <Button type="dashed" danger>
                    Удалить тест
                  </Button>
                </Space>
                <Modal
                  title="Добавление критерия"
                  open={isModalOpen}
                  onOk={() => handleAddCriteria()}
                  onCancel={() => {
                    setIsModalOpen(false);
                  }}
                >
                  <Input
                    style={{ margin: "10px" }}
                    size="large"
                    value={criteriaName}
                    onChange={(e) => setCriteriaName(e.target.value)}
                    placeholder="Введите название критерия"
                  />
                </Modal>
              </div>
            )}
          </Card>
        ) : !isTestsLoading && !isFetTest && !isTestsFetching ? (
          <Result
            status="info"
            icon={<InfoOutlined />}
            title={"Добро пожаловать"}
            subTitle={
              "Приветствуем вас на портале тестирования ДГТУ. Выберите интересующий вас тест в меню слева."
            }
            style={{ margin: "0 auto" }}
          />
        ) : (
          <Spin size="large" style={{ width: "100%" }} />
        )}
      </div>
    </MainLayout>
  );
};
