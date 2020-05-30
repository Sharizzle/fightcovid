import { Typography, Form, Icon, Input, Button, Divider } from 'antd';
import React, { FormEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import GoogleButton from 'react-google-button';
import { useAuthUser, useEmailPasswordLogin, useGoogleLoginSignUp } from '../../hooks/authHooks';

const { Title } = Typography;

// NOTE: We don't redirect with login as this is done with the RouteScooter!
// Maybe this isn't "good" practice, but it's central and the most general atm.

const LoginFormImpl = (props: FormComponentProps): React.ReactElement => {
    const [errMessage, setErrMessage] = useState(undefined as undefined | string);

    const { initializing } = useAuthUser();
    const { form } = props;
    const { getFieldDecorator, validateFields } = form;
    const googleLogin = useGoogleLoginSignUp();
    const emailPasswordLogin = useEmailPasswordLogin();

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err && !initializing) {
                const { email, password } = values;
                emailPasswordLogin(email, password).catch((e) => {
                    let errMessage = e.message;
                    if (e.code === 'auth/user-not-found') {
                        errMessage = 'No user found with these login credentials.';
                    }
                    if (e.code === 'auth/wrong-password') {
                        errMessage = 'Incorrect email/password. Did you sign in with Google?';
                    }
                    setErrMessage(errMessage);
                });
            }
        });
    };

    const onSubmitGoogle = (): void => {
        googleLogin().catch((e) => {
            setErrMessage(e.message);
        });
    };

    return (
        <div className="center-info-container">
            <Form onSubmit={onSubmit} className="narrow-form">
                {errMessage}
                <Form.Item label="Email" required={false}>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please enter an email.',
                            },
                            {
                                whitespace: true,
                                message: 'Invalid whitespace.',
                            },
                            {
                                pattern: RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'),
                                message: 'Please enter a valid email.',
                            },
                            {
                                max: 128,
                                message: 'User a shorter email!',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Please enter an email"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password" required={false}>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'Please input your password.' },
                            {
                                whitespace: true,
                                message: 'Password cannot only contain whitespace.',
                            },
                            {
                                max: 30,
                                message: 'Use a shorter password!',
                            },
                            {
                                min: 6,
                                message: 'The password must contain at least 6 characters.',
                            },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>{!initializing && <Button htmlType="submit">Login</Button>}</Form.Item>
                <Divider />
                {!initializing && (
                    <GoogleButton onClick={onSubmitGoogle} style={{ width: '100%' }} label="Login with Google" />
                )}
            </Form>
        </div>
    );
};

const LoginForm = Form.create({ name: 'normal_login' })(LoginFormImpl);

export const LoginPage: React.FC = () => {
    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>Login</Title>
            <LoginForm />
        </div>
    );
};
