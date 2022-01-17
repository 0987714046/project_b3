import { Navbar } from '../../components'
import { useState, useEffect } from 'react'
import { Table, Space, Button, Modal, Form, Input, Select } from 'antd'
import { fetchApi } from "../../Common/api"
const { Option } = Select;

const User = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [dataDepartment, setDataDepartment] = useState([])
    const [visible, setVisible] = useState(false);
    const [recordModal, setRecordModal] = useState();
    const [idSelectt, setIdSelect] = useState();

    const onFinish = async () => {
        const values = await form.validateFields();
        fetchApi(`https://nws-management.herokuapp.com/employee/${recordModal.id}`, "put", values).then((response) => {
            getData();
            setVisible(false)
        })
    };
    const getDataDepartment = () => {
        fetchApi('https://nws-management.herokuapp.com/department/paginate?page=1&limit=9999').then((response) => {
            setDataDepartment(response.items)
        })
    }
    useEffect(() => {
        getData();
        getDataDepartment();
    }, [])
    const getData = () => {
        fetchApi('https://nws-management.herokuapp.com/employee/paginate?page=1&limit=9999').then((response) => {
            setDataSource(response.items)
        })
    }
    const onDelete = (id) => {
        fetchApi(`https://nws-management.herokuapp.com/employee/${id}`, "delete").then((response) => {
            getData();
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'nameEmployee',
            key: 'nameEmployee',
        },
        {
            title: 'jobTitle',
            dataIndex: 'jobTitle',
            key: 'jobTitle',
        },
        {
            title: 'cellPhone',
            dataIndex: 'cellPhone',
            key: 'cellPhone',
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
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
                        form.setFieldsValue({ nameDepartment: text.manager.id })
                        setIdSelect(text.manager.id);
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
                        name="nameEmployee"
                        label="tên nhân viên"
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
                        name="jobTitle"
                        label="Chức vụ"
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
                        name="cellPhone"
                        label="số điện thoại"
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
                        name="email"
                        label="email"
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
                        name="nameDepartment"
                        label="tên bộ phận"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your nameDepartment!',
                            },
                        ]}
                    >
                        <Select defaultValue={117} onChange={(e) => { setIdSelect(e) }} style={{ width: 200 }}>
                            {dataDepartment && dataDepartment.map((element) => (
                                <Option value={element.id} key={element.id}>{element.nameDepartment}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default User;