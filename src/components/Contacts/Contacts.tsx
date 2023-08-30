import React, { FC } from 'react';
import { Card, Image, Row, Space } from "antd";
import style from "./Contacts.module.css";

interface contactsI {
    contactsInfo: { name: string, desc: string, avatar: string }[]
}

export const Contacts: FC<contactsI> = ({ contactsInfo }) => {
    return (
        <Space direction="horizontal" className={style.space_container} style={{display: 'flex', justifyContent: 'center'}}>
            <Row className={style.row_container}>
                {contactsInfo?.length &&
                    contactsInfo.map((el, index) => (
                        <div className={style.card_container} key={index}>
                            <Card className={style.card}>
                                <div className={style.card_content}>
                                    <div className={style.image_container}>
                                        <Image src={el.avatar} width={360} height={380} preview={false} />
                                    </div>
                                    <div className={style.text_container}>
                                        <h3>{el.name}</h3>
                                        <p>{el.desc}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
            </Row>
        </Space>
    );
};
