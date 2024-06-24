import {PageContainer} from "@ant-design/pro-components";
import {Button, Space, Table, TableProps, Tag} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                <Button type="primary" danger icon={<DeleteOutlined/>}>
                    删除
                </Button>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: '张三',
        age: 32,
        address: '江西省赣州市',
        tags: ['打乒乓球', '开发者'],
    },
    {
        key: '2',
        name: '李四',
        age: 42,
        address: '江西省南昌市新建区',
        tags: ['失败者'],
    },
    {
        key: '3',
        name: '王五',
        age: 32,
        address: '浙江温州',
        tags: ['酷', '老师'],
    },
];
export default function UserEdit() {

    return <div
        style={{
            background: '#F5F7FA',
        }}
    >
        <PageContainer
            token={{
                paddingBlockPageContainerContent: 24,
                paddingInlinePageContainerContent: 60,
            }}
            header={{
                title: '用户编辑',
                ghost: true,
                extra: [
                    <Button key="1" type="dashed" icon={<PlusOutlined/>}>
                        添加用户
                    </Button>,
                ],
            }}
        >
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }}/>
        </PageContainer>
    </div>
}