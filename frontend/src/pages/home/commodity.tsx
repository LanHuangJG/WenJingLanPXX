import {Avatar, Card, Col, Flex, Layout, Row} from "antd";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";
import {EditOutlined, EllipsisOutlined, SearchOutlined, SettingOutlined} from "@ant-design/icons";

export default function Commodity() {
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
    }


    const {Meta} = Card;
    const items: number[] = Array(100).fill(0);

    return (
        <Layout className={"h-full"}>
            <Flex justify={"center"} align={"center"} className={"mt-4"}>
                <Search
                    placeholder="请输入您要搜索的商品"
                    className={"w-1/3"}
                    allowClear
                    prefix={<SearchOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    enterButton="搜索"
                    onSearch={onSearch}
                />
            </Flex>
            <Row className={"h-full overflow-y-auto"}>
                {
                    items.map((_, index) => (
                        <Col key={index} span={6}>
                            <Flex justify={"center"} align={"center"} className={"m-2"}>
                                <Card
                                    style={{width: 300}}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        />
                                    }
                                    actions={[
                                        <SettingOutlined key="setting"/>,
                                        <EditOutlined key="edit"/>,
                                        <EllipsisOutlined key="ellipsis"/>,
                                    ]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"/>}
                                        title="商品名"
                                        description="商品描述"
                                    />
                                </Card>
                            </Flex>
                        </Col>

                    ))
                }
            </Row>
        </Layout>
    )
}
