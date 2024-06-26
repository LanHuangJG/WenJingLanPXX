import {PageContainer} from "@ant-design/pro-components";
import {Button, Form, Input, message, Modal, Select, Space, Table, TableProps, Tag} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import axios from "axios";
import {UserModel} from "../../../model/UserModel.tsx";
import useForm from "antd/es/form/hooks/useForm";
import {AddUserForm} from "../../../model/AddUserForm.tsx";

const {confirm} = Modal;

export default function UserEdit() {
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const token = localStorage.getItem("token")
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '用户密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            render: (role) => <Tag
                color={role === "admin" ? "purple" : "pink"}>{role === "admin" ? "管理员" : "普通用户"}</Tag>,
        },
        {
            title: '添加日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '操作',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: (user: UserModel) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => {
                        setCurrentEditUser(user);
                        setIsEditModalOpen(true)
                    }}>编辑</Button>
                    <Button type="primary" danger icon={<DeleteOutlined/>} onClick={() => {
                        deleteUser(user)
                    }}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];
    const [messageApi, contextHolder] = message.useMessage()

    const [data, setData] = useState<DataType[]>(
        []
    )
    const addUser = () => {
        setIsAddModalOpen(true)
    }
    const deleteUser = (user: UserModel) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleFilled/>,
            content: '您确定删除这个用户吗？他将离开很久很久',
            centered: true,
            okText: '确定删除',
            okType: 'danger',
            cancelText: '还没想好',
            onOk() {
                axios.post("/api/admin/user/delete", {
                    id: user.id
                }, {
                    headers: {
                        token: token
                    }

                }).then(res => {
                    if (res.data.code === "200") {
                        messageApi.success("删除成功").then(() => {
                        })
                        axios.get("/api/admin/user/getAll", {
                            headers: {
                                token: token
                            }
                        }).then(
                            res => {
                                //给user添加key
                                const users = res.data.users
                                users.forEach((user: UserModel) => {
                                    user.key = user.id
                                })
                                setData(users)
                            }
                        )
                    } else {
                        messageApi.error(res.data.message).then(() => {
                        })
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        axios.get("/api/admin/user/getAll", {
            headers: {
                token: token
            }

        }).then(
            res => {
                //给user添加key
                const users = res.data.users
                users.forEach((user: UserModel) => {
                    user.key = user.id
                })
                setData(users)
            }
        )
    }, [token])
    const [addUserForm] = useForm()
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const handleUserAdd = () => {
        try {
            addUserForm.validateFields().then(r => console.log(r))
            axios.post("/api/admin/user/add", {
                username: addUserForm.getFieldValue("username"),
                password: addUserForm.getFieldValue("password")
            }, {
                headers: {
                    token: token
                }
            }).then(
                res => {
                    if (res.data.code === "200") {
                        messageApi.success("添加用户成功").then(() => {
                        })
                        setIsAddModalOpen(false)
                        axios.get("/api/admin/user/getAll", {
                            headers: {
                                token: token
                            }
                        }).then(
                            res => {
                                //给user添加key
                                const users = res.data.users
                                users.forEach((user: UserModel) => {
                                    user.key = user.id
                                })
                                setData(users)
                            }
                        )
                    } else {
                        messageApi.error(res.data.message).then(() => {
                        })
                    }
                })
        } catch (e) { /* empty */
        }
    }
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [currentEditUser, setCurrentEditUser] = useState<UserModel>()
    const handleUserEdit = () => {
        axios.post("/api/admin/user/edit", {
            id: currentEditUser?.id,
            username: editUserForm.getFieldValue("username"),
            password: editUserForm.getFieldValue("password"),
            role: editUserForm.getFieldValue("role")
        }, {
            headers: {
                token: token
            }
        }).then(res => {
            if (res.data.code === "200") {
                messageApi.success("修改用户成功").then(() => {
                })
                setIsEditModalOpen(false)
                axios.get("/api/admin/user/getAll", {
                    headers: {
                        token: token
                    }
                }).then(
                    res => {
                        //给user添加key
                        const users = res.data.users
                        users.forEach((user: UserModel) => {
                            user.key = user.id
                        })
                        setData(users)
                    }
                )
            } else {
                messageApi.error(res.data.message).then(() => {
                })
            }
        })
    }
    const [editUserForm] = useForm()
    return <PageContainer
        token={{
            paddingBlockPageContainerContent: 24,
            paddingInlinePageContainerContent: 60,
        }}
        header={{
            title: '用户添加',
            ghost: true,
            extra: [
                <Button key="1" type="dashed" icon={<PlusOutlined/>} onClick={() => addUser()}>
                    添加用户
                </Button>,
            ],
        }}
    >
        {contextHolder}
        <Table columns={columns} dataSource={data} pagination={{pageSize: 50}}/>
        <Modal title="添加用户" open={isAddModalOpen} onOk={handleUserAdd} onCancel={() => setIsAddModalOpen(false)}
               centered
               width={800}>
            <Form
                form={addUserForm}
                name="addUserForm"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<AddUserForm>
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入用户名'}]}
                >
                    <Input placeholder={"请输入用户名"} allowClear/>
                </Form.Item>
                <Form.Item<AddUserForm>
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码'}]}
                >
                    <Input placeholder={"请输入密码"} allowClear/>
                </Form.Item>
            </Form>
        </Modal>
        <Modal title="修改用户" open={isEditModalOpen} onOk={handleUserEdit} onCancel={() => setIsEditModalOpen(false)}
               centered
               width={800}>
            <Form
                form={editUserForm}
                name="editUserForm"
                initialValues={{
                    username: currentEditUser?.username,
                    password: currentEditUser?.password,
                    role: "user"
                }}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 800}}
                labelAlign={"left"}
                autoComplete="off"
            >
                <Form.Item<AddUserForm>
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入用户名'}]}
                >
                    <Input placeholder={"请输入用户名"} allowClear/>
                </Form.Item>
                <Form.Item<AddUserForm>
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入密码'}]}
                >
                    <Input placeholder={"请输入密码"} allowClear/>
                </Form.Item>

                <Form.Item<AddUserForm>
                    label="角色"
                    name="role"
                    rules={[{required: true, message: '请选择角色'}]}
                >
                    <Select
                        options={[
                            {value: 'user', label: '普通用户'},
                            {value: 'admin', label: '管理员'},
                        ]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </PageContainer>
}