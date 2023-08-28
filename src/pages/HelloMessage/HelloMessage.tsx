import React, { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Card, Col, Divider, Image, Row, Space, Typography } from "antd";
import style from "./HelloMessage.module.css";
import dstuImage from "../../assets/image/DSTU.jpg";
import { useGetAllNewsQuery } from "../../app/services/NewsApi";
const { Text, Title, Paragraph } = Typography;

export const HelloMessage: FC = () => {
  const { data: news } = useGetAllNewsQuery("");
  return (
    <MainLayout
      withBacking
      contentStyle={{ padding: 0 }}
      layoutStyle={{ padding: 0 }}
    >
      <Space direction="vertical" className={style.content_wrapper}>
        <Space className={style.main_info_wrapper}>
          <Paragraph style={{ display: "flex", flexDirection: "column" }}>
            <Title style={{ color: "white", fontSize: 100, margin: 0 }}>
              НАСТАВНИК+
            </Title>
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 25 }}>
                cтань лучшим с наставником
              </Text>
              <Text style={{ color: "white", fontSize: 25, margin: -10 }}>
                cтань лучшим наставником
              </Text>
            </div>
          </Paragraph>
        </Space>
        <Divider
          orientation="center"
          plain
          style={{ fontSize: 45, color: "rgb(22, 122, 255)", fontWeight: 600 }}
        >
          О проекте
        </Divider>
        <Space size={[100, 100]} className={style.about_project_wrapper}>
          <Paragraph
            style={{ display: "flex", flexDirection: "column", width: "600px" }}
          >
            {/* <Title
              style={{ fontSize: "80px", marginTop: 0, marginBottom: "20px" }}
            >
              О проекте
            </Title> */}
            <Text
              style={{ fontSize: "25px", marginLeft: "5px", fontWeight: 600 }}
            >
              Наши цели и задачи:
            </Text>
            <Divider />
            <Text style={{ fontSize: "25px" }}>
              Цель заключается в формировании универсальных компетенций,
              необходимых для самостоятельного, осмысленного выбора дальнейшей
              образовательной траектории (вуза) и профессионального
              самоопределения с учетом индивидуальных особенностей, а также с
              учетом запросов экономики в кадрах, специфики региональных рынков
              труда.
            </Text>
          </Paragraph>
          <Image style={{ maxWidth: "700px" }} src={dstuImage} />
        </Space>
        <Divider
          orientation="center"
          plain
          style={{ fontSize: 45, color: "rgb(22, 122, 255)", fontWeight: 600 }}
        >
          Дополнительно
        </Divider>
        <Space className={style.stats_info_wrapper} size={[100, 100]}>
          <Paragraph style={{ width: "300px" }}>
            <Title
              style={{ fontSize: "40px", marginTop: 0, marginBottom: "20px" }}
            >
              4400 обучающихся
            </Title>
            <Text style={{ fontSize: "20px" }}>
              повысят карьерную грамотность и обучатся навыкам и умениям
              проектной профориентационно значимой деятельности
            </Text>
          </Paragraph>
          <Paragraph style={{ width: "200px" }}>
            <Title
              style={{ fontSize: "40px", marginTop: 0, marginBottom: "20px" }}
            >
              120 студентов
            </Title>
            <Text style={{ fontSize: "20px" }}>
              пройдут обучение по программам наставничества
            </Text>
          </Paragraph>
          <Paragraph style={{ width: "250px" }}>
            <Title
              style={{ fontSize: "40px", marginTop: 0, marginBottom: "20px" }}
            >
              40 советников
            </Title>
            <Text style={{ fontSize: "20px" }}>
              директора по воспитанию пройдут обучение по программам
              наставничества в сфере профориентации
            </Text>
          </Paragraph>
        </Space>
        <Divider
          orientation="center"
          plain
          style={{ fontSize: 45, color: "rgb(22, 122, 255)", fontWeight: 600 }}
        >
          Новости
        </Divider>
        <Space direction="vertical" className={style.news_wrapper}>
          <Row gutter={[32, 32]}>
            {news?.length &&
              news.map((item) => {
                return (
                  <Col span={8}>
                    <Card
                      bodyStyle={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "15px",
                      }}
                      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                      bordered
                      cover={
                        <Image
                          style={{ maxHeight: "300px" }}
                          alt="example"
                          src={dstuImage}
                        />
                      }
                    >
                      <Title style={{ margin: "0" }} level={4}>
                        {item.title}
                      </Title>
                      <Text style={{ margin: "0 0 0 auto" }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Space>
      </Space>
    </MainLayout>
  );
};
