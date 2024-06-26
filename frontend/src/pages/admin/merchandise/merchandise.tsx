import {PageContainer} from "@ant-design/pro-components";
import {Button, Form, Image, Input, InputNumber, message, Modal, Select, Space, Table, TableProps, Tag} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined} from "@ant-design/icons";
import {CommodityModel} from "../../../model/CommodityModel.tsx";
import {useEffect, useState} from "react";
import {AddCommodityForm} from "../../../model/AddCommodityForm.tsx";
import useForm from "antd/es/form/hooks/useForm";
import {TypeModel} from "../../../model/TypeModel.tsx";
import axios from "axios";
import {AddCommoditySelectModel} from "../../../model/AddCommoditySelectModel.tsx";

const {confirm} = Modal;


export default function Merchandise() {
    const columns: TableProps<CommodityModel>['columns'] = [
        {
            title: '商品ID',
            width: 80,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '商品图片',
            width: 100,
            dataIndex: 'pic',
            key: 'pic',
            render: (pic: string) => <Image src={pic} className={"rounded select-none"}
                                            style={{width: 50, height: 50, objectFit: "cover"}} preview={false}
                                            fallback="data:image/png;base64,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"
            />
        },
        {
            title: '商品名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            width: 300,
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '种类',
            key: 'type',
            dataIndex: 'type',
            render: (type: string) => <Tag color={"success"} key={type}>{type}</Tag>,
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (price: string) => `${price}元 / 件`
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (commodity) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => {
                        editCommodityForm.setFieldsValue(commodity)
                        editCommodityForm.setFieldValue("type", types.find(
                            (type) => type.label === commodity.type
                        )?.value)
                        setIsEditCommodityModalOpen(true)
                    }}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => deleteMerchandise(commodity)}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];
    const token = localStorage.getItem("token")
    const deleteMerchandise = (commodity: CommodityModel) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleFilled/>,
            content: '您确定删除这个商品吗？它将离开很久很久',
            centered: true,
            okText: '确定删除',
            okType: 'danger',
            cancelText: '还没想好',
            onOk() {
                axios.post("/api/admin/commodity/delete", {
                    id: commodity.id
                }, {
                    headers: {
                        token: token
                    }
                }).then(
                    res => {
                        if (res.data.code === "200") {
                            messageApi.success("删除成功").then(() => {
                            })
                            axios.get("/api/admin/commodity/getAll", {
                                headers: {
                                    token: token
                                }
                            }).then(
                                res => {
                                    const commodities = res.data.commodities
                                    commodities.forEach((commodity: CommodityModel) => {
                                        commodity.key = commodity.id
                                    })
                                    setCommodities(commodities)
                                })
                        } else {
                            messageApi.error("删除失败").then(() => {
                            })
                        }
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addMerchandiseForm] = useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        axios.post("/api/admin/commodity/add", addMerchandiseForm.getFieldsValue(), {
            headers: {
                token: token
            }
        }).then(
            res => {
                if (res.data.code === "200") {
                    messageApi.success('新增商品成功!').then(() => {
                    })
                    setIsModalOpen(false);
                    axios.get("/api/admin/commodity/getAll", {
                        headers: {
                            token: token
                        }
                    }).then(
                        res => {
                            const commodities = res.data.commodities
                            commodities.forEach((commodity: CommodityModel) => {
                                commodity.key = commodity.id
                            })
                            setCommodities(commodities)
                        })
                } else {
                    messageApi.error('新增商品失败!').then(() => {
                    })

                }
            }
        )
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleEditOk = () => {
        axios.post("/api/admin/commodity/edit", editCommodityForm.getFieldsValue(), {
            headers: {
                token: token
            }

        }).then(
            res => {
                if (res.data.code === "200") {
                    messageApi.success('编辑商品成功!').then(() => {
                    })
                    setIsEditCommodityModalOpen(false);
                    axios.get("/api/admin/commodity/getAll", {
                        headers: {
                            token: token
                        }
                    }).then(
                        res => {
                            const commodities = res.data.commodities
                            commodities.forEach((commodity: CommodityModel) => {
                                commodity.key = commodity.id
                            })
                            setCommodities(commodities)
                        })
                } else {
                    messageApi.error('编辑商品失败!').then(() => {
                    })

                }
            }
        )
    }
    const [types, setTypes] = useState<AddCommoditySelectModel[]>([])
    useEffect(() => {
        axios.get("/api/admin/commodity/getAll", {
            headers: {
                token: token
            }
        }).then(
            res => {
                const commodities = res.data.commodities
                commodities.forEach((commodity: CommodityModel) => {
                    commodity.key = commodity.id
                })
                setCommodities(commodities)
            })

        axios.get("/api/admin/type/getAll", {
            headers: {
                token: token
            }
        }).then(
            res => {
                const types = res.data.types
                setTypes(types.map(
                    (type: TypeModel) => {
                        return {
                            label: type.name,
                            value: type.id
                        }
                    }
                ))
            })
    }, [token])
    const [isEditCommodityModalOpen, setIsEditCommodityModalOpen] = useState(false)
    const [commodities, setCommodities] = useState<CommodityModel[]>([])
    const [editCommodityForm] = useForm()
    return <PageContainer
        token={{
            paddingBlockPageContainerContent: 24,
            paddingInlinePageContainerContent: 60,
        }}
        header={{
            title: '商品编辑',
            ghost: true,
            extra: [
                <Button key="1" type="dashed" icon={<PlusOutlined/>} onClick={showModal}>
                    添加商品
                </Button>,
            ],
        }}
        className={"h-full overflow-y-auto"}
    >
        {contextHolder}
        <Table columns={columns} dataSource={commodities} pagination={{pageSize: 50}}/>
        <Modal title="添加商品" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered width={800}>
            <Form
                form={addMerchandiseForm}
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<AddCommodityForm>
                    label="商品图片链接"
                    name="pic"
                    rules={[{required: true, message: '请输入商品图片链接'}]}
                >
                    <Input placeholder={"请输入商品图片链接"} allowClear/>
                </Form.Item>
                <Form.Item<AddCommodityForm>
                    label="商品名"
                    name="name"
                    rules={[{required: true, message: '请输入商品名'}]}
                >
                    <Input placeholder={"请输入商品名"} allowClear/>
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品描述"
                    name="description"
                    rules={[{required: true, message: '请输入商品描述'}]}
                >
                    <Input placeholder={"请输入商品描述"} allowClear/>
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品种类"
                    name="type"
                    rules={[{
                        required: true, message: '请选择商品种类'
                    }]}>
                    <Select
                        placeholder={"请选择商品种类"}
                        options={types}
                    />
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品价格"
                    name="price"
                    rules={[{required: true, message: '请输入商品价格'}]}
                >
                    <InputNumber placeholder={"请输入商品价格"} prefix="￥" style={{width: '100%'}}
                                 addonAfter={("/ 件")}
                    />
                </Form.Item>
            </Form>
        </Modal>
        <Modal title="修改商品" open={isEditCommodityModalOpen} onOk={handleEditOk}
               onCancel={() => setIsEditCommodityModalOpen(false)} centered width={800}>
            <Form
                form={editCommodityForm}
                name="editCommodityForm"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<AddCommodityForm>
                    label="商品ID"
                    name="id"
                >
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item<AddCommodityForm>
                    label="商品图片链接"
                    name="pic"
                    rules={[{required: true, message: '请输入商品图片链接'}]}
                >
                    <Input placeholder={"请输入商品图片链接"} allowClear/>
                </Form.Item>
                <Form.Item<AddCommodityForm>
                    label="商品名"
                    name="name"
                    rules={[{required: true, message: '请输入商品名'}]}
                >
                    <Input placeholder={"请输入商品名"} allowClear/>
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品描述"
                    name="description"
                    rules={[{required: true, message: '请输入商品描述'}]}
                >
                    <Input placeholder={"请输入商品描述"} allowClear/>
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品种类"
                    name="type"
                    rules={[{
                        required: true, message: '请选择商品种类'
                    }]}>
                    <Select
                        placeholder={"请选择商品种类"}
                        options={types}
                    />
                </Form.Item>

                <Form.Item<AddCommodityForm>
                    label="商品价格"
                    name="price"
                    rules={[{required: true, message: '请输入商品价格'}]}
                >
                    <InputNumber placeholder={"请输入商品价格"} prefix="￥" style={{width: '100%'}}
                                 addonAfter={("/ 件")}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </PageContainer>
}