import {Card, Col, Flex, Form, Input, InputNumber, Layout, message, Modal, Row} from "antd";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";
import {CreditCardOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {CommodityModel} from "../../model/CommodityModel.tsx";
import useForm from "antd/es/form/hooks/useForm";
import {CheckForm} from "../../model/CheckForm.tsx";

export default function Commodity() {
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
    }
    const [messageApi, contextHolder] = message.useMessage();
    const token = localStorage.getItem("token")
    const {Meta} = Card;
    useEffect(() => {
        axios.get("/api/commodity/getAll", {
            headers: {
                token: token
            }
        }).then(res => {
            if (res.data.code === "200") {
                setData(res.data.commodities)
            } else {
                messageApi.error(res.data.message).then(() => {
                })
            }
        })
    }, [messageApi, token]);
    const handleBuy = (commodity: CommodityModel) => {
        checkForm.setFieldsValue({
            id: commodity.id,
            name: commodity.name
        })
        setShowCheckModal(true)
    }
    const [checkForm] = useForm()
    const handleBuyOk = () => {
        setShowCheckModal(false)
        axios.post("/api/commodity/buy", {
            commodityId: checkForm.getFieldValue("id"),
            number: checkForm.getFieldValue("number"),
            address: checkForm.getFieldValue("address")
        }, {
            headers: {
                token: token
            }
        }).then(res => {
            if (res.data.code === "200") {
                messageApi.success("购买成功").then(() => {
                })
            } else {
                messageApi.error(res.data.message).then(() => {
                })
            }
        })
    }
    const [showCheckModal, setShowCheckModal] = useState(false)
    const [data, setData] = useState<CommodityModel[]>([]);
    return (
        <Layout className={"h-full"}>
            {contextHolder}
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
                    data.map((commodity, index) => (
                        <Col key={index} span={6}>
                            <Flex justify={"center"} align={"center"} className={"m-2"}>
                                <Card
                                    style={{width: 300}}
                                    cover={
                                        <img
                                            alt=""
                                            style={{objectFit: "cover", width: 300, height: 300}}
                                            src={commodity.pic}
                                        />
                                    }
                                    actions={[
                                        <HeartOutlined key="favorite"/>,
                                        <ShoppingCartOutlined key="cart"/>,
                                        <CreditCardOutlined key="buy" onClick={() => handleBuy(commodity)}/>,
                                    ]}
                                >
                                    <Meta
                                        title={commodity.name}
                                        description={
                                            <div>
                                                <div
                                                    className={"h-8 overflow-ellipsis overflow-hidden whitespace-nowrap"}>
                                                    {commodity.description}
                                                </div>
                                                <div className={"text-red-500"}>
                                                    ￥{commodity.price}/件
                                                </div>
                                            </div>
                                        }>
                                    </Meta>
                                </Card>
                            </Flex>
                        </Col>
                    ))
                }
            </Row>
            <Modal title="确认订单" open={showCheckModal} onOk={handleBuyOk} onCancel={() => setShowCheckModal(false)}
                   centered
                   width={800}>
                <Form
                    form={checkForm}
                    name="checkForm"
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    style={{maxWidth: 800}}
                    labelAlign={"left"}
                    autoComplete="off"
                >
                    <Form.Item<CheckForm>
                        label="商品ID"
                        name="id"
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item<CheckForm>
                        label="商品名"
                        name="name"
                    >
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item<CheckForm>
                        label="收货地址"
                        name="address"
                        rules={[{required: true, message: '请输入收货地址'}]}
                    >
                        <Input placeholder={"请输入收货地址"} allowClear/>
                    </Form.Item>
                    <Form.Item<CheckForm>
                        label="购买数量"
                        name="number"
                    >
                        <InputNumber placeholder={"请填写商品购买数量"} style={{width: "100%"}}/>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    )
}
