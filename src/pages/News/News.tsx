import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { useParams } from 'react-router-dom'
import { useGetNewsByIdQuery } from '../../app/services/NewsApi'
import { Space, Spin, Typography } from 'antd'
const { Title, Text } = Typography

type Props = {}
export const News = (props: Props) => {
    const { id } = useParams()
    const { data: news, isLoading } = useGetNewsByIdQuery(id as string)


    return (
        <MainLayout
            withBacking
        >
            {
                isLoading &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Spin size='large' />
                </div>
            }
            <Space direction='vertical'>
                <Title>{news?.title}</Title>
                <Text>{news?.text}</Text>
            </Space>
        </MainLayout>
    )
}