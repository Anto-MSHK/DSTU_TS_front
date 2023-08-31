import { Card, Space } from "antd";
import React, { FC } from "react";

interface NewsI {
  id: number;
  title: string;
  updatedAt: string;
  text: string;
}
export const News: FC<NewsI> = ({ title, updatedAt, text, id }) => {
  return (
    <Card
      key={id}
      title={title}
      className="news-card"
      extra={
        <Space>
          <h5 style={{ margin: 0 }}>
            {new Date(updatedAt).toLocaleDateString("ru-RU")}
          </h5>
        </Space>
      }
    >
      <p style={{ whiteSpace: "pre-line" }}>{text}</p>
    </Card>
  );
};
