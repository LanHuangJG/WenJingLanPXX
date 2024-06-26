import {Outlet, useNavigate} from "react-router-dom";
import {Avatar, Dropdown, Flex, Image, Layout, MenuProps} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {
    ExperimentOutlined,
    FileTextOutlined,
    HeartOutlined,
    LogoutOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {useEffect} from "react";

export default function Home() {

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) navigate('/login', {
            replace: true
        })
    }, [navigate])
    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <ShoppingCartOutlined/>,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    购物车
                </a>
            ),
        },
        {
            key: '2',
            icon: <FileTextOutlined/>,
            label: "我的订单",
            onClick: () => {
                navigate('/order')
            }
        },
        {
            key: '3',
            icon: <HeartOutlined/>,
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    我的收藏
                </a>
            ),
        },
        {
            key: '4',
            icon: <ExperimentOutlined/>,
            label: "系统管理",
            onClick: () => {
                navigate('/admin/dashboard')
            }
        },
        {
            key: '5',
            icon: <LogoutOutlined/>,
            label: "退出登录",
            danger: true,
            onClick: () => {
                localStorage.removeItem("token")
                navigate('/login', {
                    replace: true
                })
            }
        },
    ];

    return <Layout className={"h-full"}>
        <Header className={"bg-zinc-50 p-4 sticky"}>
            <Flex vertical={false} align={"center"} className={"h-full"}>
                <Flex vertical={false} align={"center"} gap={"middle"}>
                    <Image src={"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"} preview={false}
                           width={28} height={28}/>
                    <div className={"text-base"}>
                        江中商城
                    </div>
                </Flex>
                <div className={"flex-1"}/>
                <Dropdown menu={{items}} placement="bottom">
                    <Avatar style={{backgroundColor: '#fde3cf', color: '#f56a00'}}
                            className={"cursor-pointer"}>U</Avatar>
                </Dropdown>
            </Flex>
        </Header>
        <Content>
            <Outlet/>
        </Content>

    </Layout>
}