import React, { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import style from "./HelloMessage.module.css";
import dstuImage from "../../assets/image/DSTU.jpg";
import { useGetAllNewsQuery } from "../../app/services/NewsApi";
import { Contacts } from "../../components/Contacts/Contacts";
import { Link } from "react-router-dom";

const { Text, Title, Paragraph } = Typography;

const image1 = require("../../assets/image/persons/abakumova.png");
const image2 = require("../../assets/image/persons/birulina.jpg");
const image3 = require("../../assets/image/persons/bondarenko.png");
const image4 = require("../../assets/image/persons/gerasin.png");
const image5 = require("../../assets/image/persons/osetrova.png");
const image6 = require("../../assets/image/persons/svistunov.png");
const contactsInfo = [
  {
    name: "Абакумова Ирина Владимировна",
    desc: "академик РАО, доктор наук, профессор, руководитель социальнопедагогического направления",
    avatar: image1,
  },
  {
    name: "Бирюлина Ксения Игоревна",
    desc: "советник директора по воспитанию, менеджер проекта Samscara / основатель студии и преподаватель",
    avatar: image2,
  },
  {
    name: "Бондаренко Юрий Борисович",
    desc: "координатор проекта",
    avatar: image3,
  },
  {
    name: "Герасин Павел Владимирович",
    desc: "руководитель проектного направления",
    avatar: image4,
  },
  {
    name: "Осетрова Дарья Сергеевна",
    desc: "руководитель направления «Массовые профориентационные мероприятия»",
    avatar: image5,
  },
  {
    name: "Свистунов Андрей Владимирович",
    desc: "координатор по работе со школами ЛНР",
    avatar: image6,
  },
];

export const HelloMessage: FC = () => {
  const { data: news } = useGetAllNewsQuery("");
  return (
    <MainLayout
      withBacking
      contentStyle={{ padding: 0 }}
      layoutStyle={{ padding: 0 }}
    >
      <Space direction="vertical" className={style.content_wrapper}>
        <Space className={style.main_info_wrapper}  >
          <Paragraph className={style.main_info_parag}>
            <Title className={style.main_project_title}>
              НАСТАВНИК+
            </Title>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Text className={style.main_project_desc}>
                cтань лучшим с наставником
              </Text>
              <Text className={style.main_project_desc} >
                cтань лучшим наставником
              </Text>
            </div>
          </Paragraph>
        </Space>
        <Divider
          orientation="center"
          plain
          children={<Text  className={style.divider_title} >О проекте</Text>}
        />
        <Space size={[100, 100]} className={style.about_project_wrapper}>
          <Paragraph
            className={style.about_project_parag}
          >
            <Text
              style={{ fontSize: "25px", marginLeft: "5px", fontWeight: 600 }}
            >
              Наши цели и задачи:
            </Text>
            <Divider />
            <Text className={style.about_project_content}>
              Цель заключается в формировании универсальных компетенций,
              необходимых для самостоятельного, осмысленного выбора дальнейшей
              образовательной траектории (вуза) и профессионального
              самоопределения с учетом индивидуальных особенностей, а также с
              учетом запросов экономики в кадрах, специфики региональных рынков
              труда.
            </Text>
          </Paragraph>
          <Image
            style={{ maxWidth: "700px" }}
            src={dstuImage}
            preview={false}
          />
        </Space>
        <Divider
          orientation="center"
          plain
          children={<Text  className={style.divider_title} >Дополнительно</Text>}
        />
        <Space className={style.stats_info_wrapper} size={[100, 100]}>
          <Paragraph className={style.stats_parag} style={{ width: "300px" }}>
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
          <Paragraph className={style.stats_parag} style={{ width: "200px" }}>
            <Title
              style={{ fontSize: "40px", marginTop: 0, marginBottom: "20px" }}
            >
              120 студентов
            </Title>
            <Text style={{ fontSize: "20px" }}>
              пройдут обучение по программам наставничества
            </Text>
          </Paragraph>
          <Paragraph className={style.stats_parag} style={{ width: "250px" }}>
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
          children={<Text  className={style.divider_title} >Новости</Text>}
        />
        <Space direction="vertical" className={style.news_wrapper}>
          <Row gutter={[32, 32]} className={style.news_row_container} >
            {news?.length ? (
              news.map((item) => {
                return (
                  <Col key={item.id} span={8} style={{ minWidth:'280px'}}>
                    <Link to={`/news/${item.id}`}>
                      <Card
                        onClick={() => { }}
                        style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                        bordered
                      >
                        <Card.Grid style={{
                          width: '100%',
                          display: "flex",
                          flexDirection: "column",
                          padding: "15px",
                       
                        }}>
                          <Title style={{ margin: "0" }} level={4}>
                            {item.title}
                          </Title>
                          <Text style={{ margin: "0 0 0 auto" }}>
                            {new Date(item.updatedAt).toLocaleDateString()}
                          </Text>
                        </Card.Grid>

                      </Card>
                    </Link>
                  </Col>
                );
              })
            ) : (
              <Spin size="large" style={{ width: "100%", marginTop: -10 }} />
            )}
          </Row>
        </Space>
        <Divider
          orientation="center"
          plain
          children={<Text  className={style.divider_title} >Команда проекта</Text>}
        />
        <Contacts contactsInfo={contactsInfo} />
      </Space>
    </MainLayout>
  );
};
