import { Navbar } from '../../components'
import { useState, useEffect } from 'react'
import { Table, Space, Button, Modal, Form, Input } from 'antd'
import { fetchApi } from "../../Common/api"

const Dashboard = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [visible, setVisible] = useState(false);
    const [recordModal, setRecordModal] = useState();

    const onFinish = async () => {
        const values = await form.validateFields();
        fetchApi(`https://nws-management.herokuapp.com/department/${recordModal.id}`, "put", values).then((response) => {
            getData();
            setVisible(false)
        })
    };

    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        fetchApi('https://nws-management.herokuapp.com/department/paginate?page=1&limit=9999').then((response) => {
            setDataSource(response.items)
        })
    }
    const onDelete = (id) => {
        fetchApi(`https://nws-management.herokuapp.com/department/${id}`, "delete").then((response) => {
            getData();
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'nameDepartment',
            key: 'nameDepartment',
        },
        {
            title: 'officePhone',
            dataIndex: 'officePhone',
            key: 'officePhone',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setRecordModal(text);
                        setVisible(true);
                        form.setFieldsValue(text)
                    }}>Update</Button>
                    <Button type="primary" onClick={() => onDelete(text.id)} danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]
    return (
        <div className="main-panel ps ps--active-y" id="main-panel">
            <Navbar title="Quản lí bộ phận" />
            <Table dataSource={dataSource} columns={columns} />;
            <Modal
                title="Modal"
                visible={visible}
                onOk={() => { onFinish() }}
                onCancel={() => { setVisible(false) }}
                okText="Ok"
                cancelText="Cancel"
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="nameDepartment"
                        label="tên bộ phận"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nameDepartment!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="officePhone"
                        label="điện thoại văn phòng"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your officePhone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default Dashboard;