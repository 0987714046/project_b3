import { Form, Input, Button } from 'antd';
import { fetchApi } from "../../Common/api"
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        console.log('Success:', values);
        fetchApi('https://nws-management.herokuapp.com/auth/login', "POST", { username: values.username, password: values.password }).then((response) => {
            console.log(response.accessToken);
            localStorage.setItem('token', response.accessToken);
            navigate('/dashboard')
        })
    };


    return (
        <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item>

                <a className="login-form-forgot" href="/reset-password">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};
export default Login;