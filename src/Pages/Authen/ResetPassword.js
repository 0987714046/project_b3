import { Form, Input, Button,message } from 'antd';
import { fetchApi } from "../../Common/api"
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        fetchApi('https://nws-management.herokuapp.com/user/auth/changePassword', "put", values).then((response) => {
            if(response.statusCode) {
                return message.error(response.message)
            }
            navigate('/')
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
                label="Password Old"
                name="oldPass"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
                label="Password new"
                name="newPass"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
                label="Password confirm"
                name="confirm"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default ResetPassword;