import { Navbar } from '../../components'
import { useState, useEffect } from 'react'
import { Table, Space, Button, Modal, Form, Input, Select, message, Upload, Image } from 'antd'
import { fetchApi } from "../../Common/api"
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;

const User = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [dataDepartment, setDataDepartment] = useState([])
    const [visible, setVisible] = useState(false);
    const [recordModal, setRecordModal] = useState();
    const [idSelectt, setIdSelect] = useState();
    const [modalAction, setModalAction] = useState();
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState({});
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(file);
    };
    const uploadFile = (info) => {
        console.log('222222222222222222222222', info);
        setImageFile(info.file);

        if (info.fileList.length) {
            getBase64(info.file, (imageUrl) => {
                setImageUrl(imageUrl);
            });
        }
    };
    const onFinish = async () => {
        const values = await form.validateFields();
        const dataPush = {
            ...values,
            photo: imageUrl,
            image: null
        }
        const formData = new FormData();
        formData.append("nameEmployee", values.nameEmployee);
        formData.append("photo", imageFile);
        formData.append("jobTitle", values.jobTitle);
        formData.append("cellPhone", values.cellPhone);
        formData.append("email", values.email);
        formData.append("managerId", values.nameDepartment);
        if (modalAction && modalAction === 'UPDATE') {
            fetchApi(`https://nws-management.herokuapp.com/employee/${recordModal.id}`, "put", formData).then((response) => {
                if (response.statusCode !== 201) {
                    return message.error(response.message)
                }
                getData();
                setVisible(false)
                form.resetFields()
            })
        }
        if (modalAction && modalAction === 'CREATE') {
            fetchApi(`https://nws-management.herokuapp.com/employee`, "POST", formData).then((response) => {
                if (response.statusCode !== 201) {
                    return message.error(response.message)
                }
                getData();
                setVisible(false)
                form.resetFields()
            })
        }
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
                        setModalAction('UPDATE')
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
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>アップロード</div>
        </div>
    );
    return (
        <div className="main-panel ps ps--active-y" id="main-panel">
            <Navbar title="Quản lí bộ phận" />
            <Button type="primary" block onClick={() => {
                setVisible(true);
                setModalAction('CREATE');
            }}>
                Thêm mới
            </Button>
            <Table dataSource={dataSource} columns={columns} />
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
                    <Form.Item name="image" label="ảnh">
                        <Upload
                            fileList={[]}
                            maxCount={1}
                            accept="image/*"
                            listType="picture-card"
                            className="avatar-uploader"
                            onChange={uploadFile}
                            beforeUpload={() => false}
                            showUploadList={false}
                            onRemove={() => setImageUrl("")}
                        >
                            {imageUrl.length == 0 && uploadButton}
                            {imageUrl && <Image
                                className="menu-img"
                                src={imageUrl}
                                preview={false}
                            />}

                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
export default User;