import Typography from 'antd/es/typography';
import React, { FormEvent, useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Divider, Form, Icon, Input } from 'antd';
import GoogleButton from 'react-google-button';

import { useAuthUser, useEmailPasswordSignUp, useGoogleLoginSignUp } from '../../hooks/authHooks';
import { useInitialiseUserWithIdAndEmail } from '../../hooks/currentUserHooks';
import firebase from 'firebase/app';
import { useFirestore } from '../../hooks/useFirestore';

const { Title } = Typography;

// NOTE: We don't redirect with login as this is done with the RouteScooter!
// Maybe this isn't "good" practice, but it's central and the most general atm.

const SignUpFormImpl = (props: FormComponentProps): React.ReactElement => {
    const [errMessage, setErrMessage] = useState(undefined as undefined | string);

    const store = useFirestore();
    const { initializing, authUser } = useAuthUser();

    const { form } = props;
    const { getFieldDecorator, validateFields } = form;

    const initialiseUser = useInitialiseUserWithIdAndEmail();
    const emailPasswordSignUp = useEmailPasswordSignUp();
    const googleSignUp = useGoogleLoginSignUp();

    const onSubmitStandard = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err && !initializing) {
                const { email, password } = values;
                emailPasswordSignUp(email, password)
                    .catch((e) => {
                        setErrMessage(e.message);
                        console.error(e);
                    })
                    .then(async (doc: firebase.auth.UserCredential | void) => {
                        if (doc && doc.user && doc.user.uid && doc.user.email) {
                            initialiseUser(doc.user.uid, doc.user.email).catch((e) => {
                                console.error(e);
                            });
                        }
                    });
            }
        });
    };

    const onSubmitGoogle = (): void => {
        googleSignUp()
            .catch((e) => {
                setErrMessage(e.message);
                console.error(e);
            })
            .then(async (doc: firebase.auth.UserCredential | void) => {
                if (doc && doc.user && doc.user.uid && doc.user.email) {
                    initialiseUser(doc.user.uid, doc.user.email).catch((e) => {
                        console.error(e);
                    });
                }
            });
    };

    return (
        <div className="center-info-container">
            <Form onSubmit={onSubmitStandard} className="narrow-form">
                {errMessage}
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please enter an email!',
                            },
                            {
                                whitespace: true,
                                message: 'Invalid whitespace!',
                            },
                            {
                                pattern: RegExp('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'),
                                message: 'Please enter a valid email',
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
                <Form.Item label="Password">
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'Please input your Password!' },
                            {
                                whitespace: true,
                                message: 'Password cannot only contain whitespace!',
                            },
                            {
                                max: 30,
                                message: 'Use a shorter password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters',
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
                <Form.Item label="Verify password">
                    {getFieldDecorator('re-password', {
                        rules: [
                            { required: true, message: 'Please verify your password.' },
                            {
                                whitespace: true,
                                message: 'Password cannot only contain whitespace!',
                            },
                            {
                                max: 30,
                                message: 'Please use a shorter password!',
                            },
                            {
                                min: 6,
                                message: 'The password must contain at least 6 characters.',
                            },
                            {
                                validator: (rule, value, callback): void => {
                                    if (value && value !== form.getFieldValue('password')) {
                                        callback(`Please ensure the passwords match.`);
                                    } else {
                                        callback();
                                    }
                                },
                            },
                        ],
                    })(
                        <Input
                            required
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Verify password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {!initializing && !authUser && store && <Button htmlType="submit">Sign up</Button>}
                </Form.Item>
                <Divider />
                <GoogleButton
                    onClick={(): void => {
                        !initializing && !authUser && onSubmitGoogle();
                    }}
                    style={{ width: '100%' }}
                    label="Sign up with Google"
                />
            </Form>
        </div>
    );
};

const SignUpForm = Form.create({ name: 'normal_login' })(SignUpFormImpl);

export const SignUpPage: React.FC = () => {
    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>Sign up</Title>
            <SignUpForm />
        </div>
    );
};
