import {Button, Form, Input, message, Modal, Space, Table, TableProps} from "antd"
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined} from "@ant-design/icons"
import {PageContainer} from "@ant-design/pro-components"
import {useEffect, useState} from "react"
import {TypeModel} from "../../../model/TypeModel.tsx"
import {AddTypeForm} from "../../../model/AddTypeForm.tsx"
import axios from "axios"
import useForm from "antd/es/form/hooks/useForm";
import {EditTypeForm} from "../../../model/EditTypeForm.tsx";

const {confirm} = Modal;

export default function Type() {
    const token = localStorage.getItem("token")
    const columns: TableProps<TypeModel>['columns'] = [
        {
            title: '种类ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '种类名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "添加时间",
            dataIndex: "date",
            key: "date"
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (type) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => edit(type)}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => deleteType(type)}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const edit = (type: TypeModel) => {
        editForm.setFieldsValue(type)
        setIsEditModalOpen(true)
    }
    const deleteType = (type: TypeModel) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleFilled/>,
            content: '您确定删除这个商品种类吗',
            centered: true,
            okText: '确定删除',
            okType: 'danger',
            cancelText: '还没想好',
            onOk() {
                axios.post("/api/admin/type/delete", {
                    id: type.id
                }, {
                    headers: {
                        token: token
                    }
                }).then(
                    res => {
                        if (res.data.code === "200") {
                            messageApi.success("删除成功").then(() => {
                            })
                            axios.get("/api/admin/type/getAll", {
                                headers: {
                                    token: token
                                }
                            }).then(
                                res => {
                                    const types = res.data.types
                                    types.forEach((type: TypeModel) => {
                                        type.key = type.id
                                    })
                                    setData(types)
                                })
                        } else {
                            messageApi.error(res.data.message).then(() => {
                            })
                        }
                    }
                )
            },
            onCancel() {

            },
        });
    }
    const handleOk = () => {
        axios.post("/api/admin/type/add", {
            name: form.getFieldValue("typeName")
        }, {
            headers: {
                token: token
            }

        }).then(
            res => {
                if (res.data.code === "200") {
                    messageApi.success("添加成功").then(() => {
                    })
                    axios.get("/api/admin/type/getAll", {
                        headers: {
                            token: token
                        }

                    }).then(
                        res => {
                            const types = res.data.types
                            types.forEach((type: TypeModel) => {
                                type.key = type.id
                            })
                            setData(types)
                        })
                } else {
                    messageApi.error(res.data.message).then(() => {
                    })
                }
            }
        )
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    };

    const [data, setData] = useState()
    useEffect(() => {
        axios.get("/api/admin/type/getAll", {
            headers: {
                token: token
            }
        }).then(
            res => {
                const types = res.data.types
                types.forEach((type: TypeModel) => {
                    type.key = type.id
                })
                setData(types)
            })
    }, [])
    const [form] = useForm()
    const [editForm] = useForm()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const handleEditOk = () => {
        axios.post("/api/admin/type/edit", {
            id: editForm.getFieldValue("id"),
            name: editForm.getFieldValue("name")
        }, {
            headers: {
                token: token
            }

        }).then(
            res => {
                if (res.data.code === "200") {
                    messageApi.success("修改成功").then(() => {
                    })
                    axios.get("/api/admin/type/getAll", {
                        headers: {
                            token: token
                        }
                    }).then(
                        res => {
                            const types = res.data.types
                            types.forEach((type: TypeModel) => {
                                type.key = type.id
                            })
                            setData(types)
                        })
                } else {
                    messageApi.error(res.data.message).then(() => {
                    })
                }
            }
        )
        setIsEditModalOpen(false)

    }
    const handleEditCancel = () => {
        setIsEditModalOpen(false)
    }
    return <PageContainer
        token={{
            paddingBlockPageContainerContent: 24,
            paddingInlinePageContainerContent: 60,
        }}
        header={{
            title: '种类编辑',
            ghost: true,
            extra: [
                <Button key="1" type="dashed" icon={<PlusOutlined/>} onClick={() => showModal()}>
                    添加种类
                </Button>,
            ],
        }}
    >
        {contextHolder}
        <Table columns={columns} dataSource={data}/>
        <Modal title="添加种类" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered width={800}>
            <Form
                form={form}
                name="form"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<AddTypeForm>
                    label="种类名"
                    name="typeName"
                    rules={[{required: true, message: '请输入种类名'}]}
                >
                    <Input placeholder={"请输入种类名"} allowClear/>
                </Form.Item>
            </Form>
        </Modal>

        <Modal title="修改种类" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel} centered
               width={800}>
            <Form
                form={editForm}
                name="editForm"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<EditTypeForm>
                    label="种类ID"
                    name="id"
                >
                    <Input disabled={true}/>
                </Form.Item>
                <Form.Item<EditTypeForm>
                    label="种类名"
                    name="name"
                    rules={[{required: true, message: '请输入种类名'}]}
                >
                    <Input placeholder={"请输入种类名"} allowClear/>
                </Form.Item>
            </Form>
        </Modal>
    </PageContainer>
}