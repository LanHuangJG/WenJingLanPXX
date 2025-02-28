import {ProCard, StatisticCard} from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import {useState} from 'react';
import {Layout} from "antd";

const {Statistic} = StatisticCard;

export default function Dashboard() {
    const [responsive, setResponsive] = useState(false);
    const imgStyle = {
        display: 'block',
        width: 42,
        height: 42,
    };
    return (
        <RcResizeObserver
            key="resize-observer"
            onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}
        >

            <Layout className={"overflow-y-auto h-full"}>
                <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
                    <StatisticCard
                        statistic={{
                            title: '支付金额',
                            value: 2176,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '订单数',
                            value: 475,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '成功订单数',
                            value: 87,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                    <StatisticCard
                        statistic={{
                            title: '浏览量',
                            value: 1754,
                            icon: (
                                <img
                                    style={imgStyle}
                                    src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                                    alt="icon"
                                />
                            ),
                        }}
                    />
                </StatisticCard.Group>

                <ProCard
                    title="数据概览"
                    extra="2024年6月28日 星期五"
                    split={responsive ? 'horizontal' : 'vertical'}
                    headerBordered
                    bordered
                >
                    <ProCard split="horizontal">
                        <ProCard split="horizontal">
                            <ProCard split="vertical">
                                <StatisticCard
                                    statistic={{
                                        title: '昨日全部订单数',
                                        value: 234,
                                        description: (
                                            <Statistic
                                                title="较本月平均订单数"
                                                value="8.04%"
                                                trend="down"
                                            />
                                        ),
                                    }}
                                />
                                <StatisticCard
                                    statistic={{
                                        title: '本月累计订单数',
                                        value: 234,
                                        description: (
                                            <Statistic title="月同比" value="8.04%" trend="up"/>
                                        ),
                                    }}
                                />
                            </ProCard>
                            <ProCard split="vertical">
                                <StatisticCard
                                    statistic={{
                                        title: '进行中订单',
                                        value: '12/56',
                                        suffix: '个',
                                    }}
                                />
                                <StatisticCard
                                    statistic={{
                                        title: '订单总数',
                                        value: '134',
                                        suffix: '个',
                                    }}
                                />
                            </ProCard>
                        </ProCard>
                        <StatisticCard
                            title="订单数走势"
                            chart={
                                <img
                                    src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                                    width="100%"
                                    alt={""}/>
                            }
                        />
                    </ProCard>
                    <StatisticCard
                        title="订单占用情况"
                        chart={
                            <img
                                src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                                alt="大盘"
                                width="100%"
                            />
                        }
                    />
                </ProCard>
            </Layout>

        </RcResizeObserver>
    );
}