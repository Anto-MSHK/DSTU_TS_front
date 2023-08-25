import React, { FC } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { Card, Col, Divider, Image, Row, Space, Typography } from "antd";
import style from './HelloMessage.module.css'
import dstuImage from '../../assets/image/DSTU.jpg'
import Meta from "antd/es/card/Meta";
const { Text, Title, Paragraph } = Typography

const mockNews = [
  {
    title: 'Миллион ещё на подходе',
    content: 'Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности',
    createdAt: '25.08.2023'
  },
  {
    title: '300 тысяч уже готово. Миллион ещё на подходе',
    content: 'Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности, Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности',
    createdAt: '25.08.2023'
  },
  {
    title: '300 тысяч уже готово. Миллион ещё на подходе',
    content: 'Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности, Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности, Повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности',
    createdAt: '25.08.2023'
  },
]

export const HelloMessage: FC = () => {
  return (
    <MainLayout withBacking contentStyle={{ padding: 0 }} layoutStyle={{ padding: 0 }}>
      <Space direction="vertical" className={style.content_wrapper}>
        <Space className={style.main_info_wrapper}>
          <Paragraph style={{ display: 'flex', flexDirection: 'column' }}>
            <Title style={{ color: 'white', fontSize: 150, margin: 0 }}>
              НАСТАВНИК+
            </Title>
            <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
              <Text style={{ color: 'white', fontSize: 25 }}>
                Стань лучшим с наставником
              </Text>
              <Text style={{ color: 'white', fontSize: 25 }}>
                Стань лучшим наставником
              </Text>
            </div>
          </Paragraph>
        </Space>
        <Divider orientation="left" plain>
          О проекте
        </Divider>
        <Space size={[100, 100]} className={style.about_project_wrapper}>
          <Paragraph style={{ display: 'flex', flexDirection: 'column', width: '600px' }}>
            <Title style={{ fontSize: '80px', marginTop: 0, marginBottom: '20px' }}>
              О проекте
            </Title>
            <Text style={{ fontSize: '15px', marginLeft: '5px' }}>Расскажем о наших целях и задачах:</Text>
            <Divider />
            <Text style={{ fontSize: '25px' }}>
              Цель заключается в формировании универсальных компетенций,
              необходимых для самостоятельного, осмысленного выбора дальнейшей
              образовательной траектории (вуза) и профессионального самоопределения с
              учетом индивидуальных особенностей, а также с учетом запросов экономики в кадрах,
              специфики региональных рынков труда.
            </Text>
          </Paragraph>
          <Image style={{ maxWidth: '700px' }} src={dstuImage} />
        </Space>
        <Divider orientation="center" plain>
          Дополнительно
        </Divider>
        <Space className={style.stats_info_wrapper} size={[100, 100]}>
          <Paragraph style={{ width: '300px' }}>
            <Title style={{ fontSize: '40px', marginTop: 0, marginBottom: '20px' }}>
              4400 обучающихся
            </Title>
            <Text style={{ fontSize: '20px' }}>повысят карьерную грамотность и обучатся навыкам и умениям проектной профориентационно значимой деятельности</Text>
          </Paragraph>
          <Paragraph style={{ width: '200px' }}>
            <Title style={{ fontSize: '40px', marginTop: 0, marginBottom: '20px' }}>
              120 студентов
            </Title>
            <Text style={{ fontSize: '20px' }}>пройдут обучение по программам наставничества</Text>
          </Paragraph>
          <Paragraph style={{ width: '250px' }}>
            <Title style={{ fontSize: '40px', marginTop: 0, marginBottom: '20px' }}>
              40 советников
            </Title>
            <Text style={{ fontSize: '20px' }}>директора по воспитанию пройдут обучение по программам наставничества в сфере профориентации
            </Text>
          </Paragraph>
        </Space>
        <Divider orientation="left" plain>
          Новости
        </Divider>
        <Space direction="vertical" className={style.news_wrapper}>
          <Title style={{ fontSize: '50px' }}>Новости</Title>
          <Row gutter={[32, 32]}>
            {
              mockNews.length && mockNews.map((item) => {
                return (
                  <Col span={8}>
                    <Card
                      bodyStyle={{ display: 'flex', flexDirection: 'column', padding: '15px', }}
                      bordered
                      cover={
                        <Image
                          style={{ maxHeight: '300px' }}
                          alt="example"
                          src={dstuImage}
                        />
                      }>
                      <Title style={{margin: '0'}} level={4}>{item.title}</Title>
                      <Text style={{ marginTop: '20px', marginBottom: '10px'}}>{item.content}</Text>
                      <Text style={{ margin: '0 0 0 auto' }}>{item.createdAt}</Text>
                    </Card>
                  </Col>)
              })
            }
          </Row>
        </Space>
      </Space>
    </MainLayout>
  );
};
