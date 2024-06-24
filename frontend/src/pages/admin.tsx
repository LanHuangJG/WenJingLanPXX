import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Dropdown, Flex, Image, Layout, Menu, MenuProps, Tag} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {
    HomeOutlined,
    LaptopOutlined,
    LogoutOutlined,
    NotificationOutlined,
    PieChartOutlined,
    RadarChartOutlined,
    UserOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {useEffect} from "react";

export default function Admin() {
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        console.log(location.pathname)
    })
    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <HomeOutlined/>,
            label: "首页",
            onClick: () => {
                navigate('/')
            }
        },
        {
            key: '2',
            icon: <LogoutOutlined/>,
            label: "退出登录",
            danger: true,
            onClick: () => {
                navigate('/admin')
            }
        },
    ];
    const items2: MenuProps['items'] = [
        {
            key: '/admin/dashboard',
            icon: <PieChartOutlined/>,
            label: '仪表盘',
            onClick: () => {
                navigate('/admin/dashboard', {
                    replace: true
                })
            }
        },
        {
            key: 'sub2',
            icon: <UserOutlined/>,
            label: '用户管理',
            children: [
                {
                    key: '/admin/user/edit',
                    label: '用户编辑',
                    onClick: () => {
                        navigate('/admin/user/edit', {
                            replace: true
                        })
                    }
                },
                {
                    key: '2',
                    label: '用户下线',
                    onClick: () => {
                        navigate('/admin/dashboard')
                    }
                }
            ]
        },
        {
            key: 'sub3',
            icon: <LaptopOutlined/>,
            label: '商品管理',
            children: [
                {
                    key: '3',
                    label: '商品列表',
                },
                {
                    key: '4',
                    label: '商品添加',
                }
            ]
        },
        {
            key: 'sub4',
            icon: <NotificationOutlined/>,
            label: '订单管理',
            children: [
                {
                    key: '5',
                    label: '订单列表',
                }
            ]
        }
    ]
    return <Layout className={"h-full"}>
        <Header className={"bg-zinc-50 p-4"}>
            <Flex vertical={false} align={"center"} className={"h-full"}>
                <Flex vertical={false} align={"center"} gap={"middle"}>
                    <Image src={"https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"} preview={false}
                           width={28} height={28}/>
                    <div className={"text-base"}>
                        江中商城
                    </div>
                    <Tag icon={<RadarChartOutlined spin={true}/>} color="processing">
                        系统管理
                    </Tag>
                </Flex>
                <div className={"flex-1"}/>
                <Dropdown menu={{items}} placement="bottom">
                    <Avatar style={{backgroundColor: '#fde3cf', color: '#f56a00'}}
                            className={"cursor-pointer"}>A</Avatar>
                </Dropdown>
            </Flex>
        </Header>
        <Layout>
            <Sider width={200} theme={"light"}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    style={{height: '100%', borderRight: 0}}
                    items={items2}
                />
            </Sider>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    </Layout>
}