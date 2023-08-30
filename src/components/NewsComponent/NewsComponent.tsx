import React, {FC, useState} from 'react';
import {Button, Card, Input, message, Modal, Result, Space} from "antd";
import {DeleteOutlined, InfoOutlined, PlusOutlined} from "@ant-design/icons";
import {useAddNewsMutation, useDeleteNewsMutation} from "../../app/services/NewsApi";
import {NewsT} from "../../app/Types/DirectionType";
import './NewsComponent.css'

interface NewsComponentI {
    selectedNews: NewsT | undefined;
    setSelectedNews:  React.Dispatch<React.SetStateAction<NewsT | undefined>>;
    setActiveElement: React.Dispatch<React.SetStateAction<string>>;
}

export const NewsComponent:FC<NewsComponentI> = ({selectedNews, setSelectedNews, setActiveElement}) => {

    const [newsTitle, setNewsTitle] = useState("");
    const [newsContent, setNewsContent] = useState("");
    const [isAddingNews, setIsAddingNews] = useState(false);


    const [addNewsMutation] = useAddNewsMutation();

    const handleAddNews = async () => {
        try {
            const newsData: Partial<NewsT> = {
                title: newsTitle,
                text: newsContent,
            };
            const response = await addNewsMutation(newsData as NewsT);
            console.log("News added successfully:", response);
            setIsAddingNews(false);
            setActiveElement("");
            setNewsTitle("");
            setNewsContent("");
        } catch (error) {
            console.error("Error adding news:", error);
            message.error("An error occurred while adding news.");
        }
    };


    const [deleteNewsMutation] = useDeleteNewsMutation();

    const handleDeleteNews = async () => {
        try {
            if (!selectedNews) {
                return;
            }
            const response = await deleteNewsMutation(selectedNews);
            console.log("News deleted successfully:", response);
            setSelectedNews(undefined);
        } catch (error) {
            console.error("Error deleting news:", error);
            message.error("An error occurred while deleting news.");
        }
    };

    return (
        <div className="news-component-container">
            <div className="add-button">
                <Button onClick={() => setIsAddingNews(true)}>
                    <PlusOutlined /> Добавить
                </Button>
            </div>
            {selectedNews ? (
                <div className="news-details">
                    <Card
                        title={selectedNews.title}
                        className="news-card"
                        extra={
                            <Space>
                                <h5 style={{ margin: 0 }}>
                                    {selectedNews &&
                                        new Date(selectedNews.updatedAt).toLocaleDateString(
                                            'ru-RU'
                                        )}
                                </h5>{' '}
                                <Button
                                    type="primary"
                                    danger
                                    onClick={handleDeleteNews}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Space>
                        }
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {selectedNews.text}
                        </p>
                    </Card>
                </div>
            ) : (
                <Result
                    status="info"
                    icon={<InfoOutlined />}
                    title={'Добро пожаловать'}
                    subTitle={
                        'Приветствуем вас на портале тестирования ДГТУ. Выберите интересующую вас новость в меню слева.'
                    }
                    className="info-result"
                />
            )}
            <Modal
                title="Добавление новости"
                visible={isAddingNews}
                onCancel={() => setIsAddingNews(false)}
                cancelText={"Отменить"}
                okText={"Добавить"}
                onOk={handleAddNews}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Input
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        placeholder="Заголовок новости"
                    />
                    <Input.TextArea
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        rows={4}
                        placeholder="Текст новости"
                    />
                </div>
            </Modal>
        </div>
    );
};