import React from "react";
import {
  ArrowUpOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  DollarCircleFilled,
  SmileFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  MenuProps,
  Row,
  Statistic,
} from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Title from "antd/es/skeleton/Title";
import QuizQuestion from "./components/QuizQuestion/QuizQuestion";
import { Widget } from "./components/Widget/Widget";
import OpenQuizQuestion from "./components/OpenQuizQuestion/OpenQuizQuestion";
import { MultipleQuizQuestion } from "./components/MultipleQuizQuestion/MultipleQuizQuestion";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const question = "Какая планета ближе к Солнцу?";
  const options = [
    { id: "1", text: "Марс" },
    { id: "2", text: "Венера" },
    { id: "3", text: "Земля" },
    { id: "4", text: "Меркурий" },
  ];
  const correctAnswers = ["1", "3"];
  const correctAnswer = "4";

  const handleSubmit = (isCorrect: boolean) => {};

  return (
    <Layout>
      <Header className="header" style={{backgroundColor: 'white'}}>
        <div className="logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
           
{/* Прописать Route */}

          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <h1>Название направления</h1>
            <div style={{ marginBottom: 24 }}>
              Здесь будет описание выбранной позиции.
            </div>
            <Row gutter={16} style={{ gap: 10 }}>
              <Widget
                title="тип занятости"
                value="полная"
                icon={<SmileFilled />}
              />
              <Widget
                title="зарплата"
                value="80,000 - 120,000 "
                icon={<DollarCircleFilled />}
                suffix={"₽"}
              />
            </Row>
            <Button type="primary" style={{ marginTop: 24 }}>
              Перейти к тестированию
            </Button>
            <QuizQuestion
              question={question}
              options={options}
              correctAnswer={correctAnswer}
              onSubmit={handleSubmit}
            />
            <OpenQuizQuestion
              question={question}
              correctAnswer={correctAnswer}
              onSubmit={handleSubmit}
            />
            <MultipleQuizQuestion
              question={question}
              options={options}
              correctAnswers={correctAnswers}
              onSubmit={handleSubmit}
            />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
