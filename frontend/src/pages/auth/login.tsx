import {Button, Card, Flex, Form, FormProps, Input, notification} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [api, contextHolder] = notification.useNotification();

    const toRegister = () => {
        navigate('/register', {
            replace: true
        })
    }
    type FieldType = {
        username?: string;
        password?: string;
    };
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        axios.post("/api/auth/login", {
            username: values.username,
            password: values.password
        }).then(
            res => {
                if (res.data.code === "200") {
                    localStorage.setItem("token",res.data.token)
                    navigate('/', {
                        replace: true
                    })
                } else {
                    api.error({
                        message: "登录失败",
                        description: res.data.message
                    })
                }
            }
        )
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Flex justify={"center"} align={"center"} className={"h-full"}>
        {contextHolder}
        <Card title="江中商城" style={{width: 600}} extra={"登录"}
              bordered={false}>
            <Form
                name="basic"
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                style={{maxWidth: 600}}
                initialValues={{remember: false}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="用户名"
                    name="username"
                    rules={[{required: true, message: '请输入您的用户名'}]}
                >
                    <Input prefix={<UserOutlined/>} allowClear size={"large"}
                           placeholder={"请输入您的用户名"}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="密码"
                    name="password"
                    rules={[{required: true, message: '请输入您的密码'}]}
                >
                    <Input.Password prefix={<LockOutlined/>} allowClear size={"large"}
                                    placeholder={"请输入您的密码"}/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Flex justify={"end"} gap={"middle"}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button type={"dashed"} onClick={() => toRegister()}>
                            还没有账号?
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Card>
    </Flex>
}
