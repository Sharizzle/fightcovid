import React, { FormEvent, useState } from 'react';
import Typography from 'antd/es/typography';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Checkbox, Form, Icon, Input, Modal, notification, Select, Slider } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { skillsFilterData } from '../../common/skills-info';
import { getDisplayTextFromTagID } from '../../common/get-tag-display-text';
import {
    useReadCurrentUserInfo,
    useUserDefinitelyNeedsInit,
    useWriteCurrentUserInfo,
} from '../../hooks/currentUserHooks';
import { TUserInfo } from '../../common/volunteer-into-types';
import { useHistory } from 'react-router';
import { LargerSocialMediaShareBar } from '../../components/social-media-bars/social-media-bars';
import { percentToWeeklyAvailableHours } from '../../common/utils';
import { ListProjectsRoute } from '../../routing/route-mapping';
import { PrivacyPolicyLink } from '../../common/common-constants';

const { Title, Text } = Typography;
const { Option } = Select;

const openNotificationWithIcon = (): void => {
    notification['success']({
        message: 'Successfully updated profile settings',
        icon: (
            <Icon
                style={{ position: 'relative', fontSize: '24px' }}
                type="check-circle"
                theme="twoTone"
                twoToneColor="#52c41a"
            />
        ),
    });
};

const UserProfileFormImpl = (props: FormComponentProps): React.ReactElement => {
    const [modalVisible, setModalVisible] = useState(false);

    const { form } = props;
    const { getFieldDecorator, validateFields } = form;

    const userInfo = useReadCurrentUserInfo();
    const setUserInfo = useWriteCurrentUserInfo();

    const needsInit = useUserDefinitelyNeedsInit();

    const history = useHistory();

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!!userInfo && !err) {
                const { name, about, links, location, skills, hours, listUser } = values;
                const contactLinks = links ? links : '';
                const locationStr = location ? location : '';
                const hoursPerWeek = hours ? hours : 0;
                const skillsTagIDs = skills ? skills : [];
                const updatedUserInfo: TUserInfo = {
                    id: userInfo.id as string,
                    name: name as string,
                    email: userInfo.email as string,
                    description: about as string,
                    contactLinks: contactLinks as string,
                    location: locationStr as string,
                    hoursPerWeekPercent: hoursPerWeek,
                    skillsTagIDs: skillsTagIDs as Array<string>,
                    userIsDefined: true,
                    listUser: !!listUser,
                };

                setUserInfo(updatedUserInfo);
                setTimeout(() => {
                    if (!userInfo.userIsDefined) {
                        setModalVisible(true);
                    } else {
                        openNotificationWithIcon();
                        history.push(ListProjectsRoute.url);
                    }
                }, 500);

                return;
            }

            if (!userInfo) {
                console.error('Trying to submit with undefined my-profile. Very strange.');
            }
        });
    };

    const formHoursValue = form.getFieldsValue(['hours']).hours;
    const userHoursValue = userInfo?.hoursPerWeekPercent ? userInfo?.hoursPerWeekPercent : 0;

    const hoursDisplayValue = formHoursValue && formHoursValue > 0 ? formHoursValue : userHoursValue;
    const hoursDisplayString = `Hours available for volunteering per week (${percentToWeeklyAvailableHours(
        hoursDisplayValue,
    )})`;

    return (
        <>
            <Modal
                cancelText="Go back"
                onCancel={(): void => setModalVisible(false)}
                onOk={(): void => history.push(ListProjectsRoute.url)}
                title="Thanks for signing up!"
                visible={modalVisible}
                okText="Take me to the projects"
            >
                <div className="simple-flex-row-wrap">
                    <Text>Your information has been updated!</Text>
                    <Icon
                        style={{ marginLeft: '6px', position: 'relative', bottom: '5px', fontSize: '26px' }}
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                    />
                </div>
                <div>
                    <Text>
                        We are just getting started with this project and would appreciate your feedback. If you have
                        any suggestions (or encounter any bugs), please let us know at{' '}
                    </Text>
                    <Text style={{ color: '#096dd9' }}>feedback@fightcovid.uk.</Text>
                </div>
                <div className="common-break-8px" />
                <div>
                    <Text>Thank you and please share!</Text>
                </div>
                <LargerSocialMediaShareBar />
            </Modal>
            <div className="center-info-container">
                <div className="common-break-16px" />
                <Form onSubmit={onSubmit} className="mid-width-info">
                    <div>
                        <Text>
                            Complete the form below to create your profile. Once you have a profile you’ll also be able
                            to share your own projects and ideas.
                        </Text>
                    </div>
                    <div className="common-break-16px" />
                    <Form.Item label="Name" required={true}>
                        {getFieldDecorator('name', {
                            initialValue: userInfo?.name,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter your name.',
                                },
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    max: 64,
                                    message: 'Name too long!',
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Please enter your name"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Email" required={true}>
                        {getFieldDecorator('email', {
                            initialValue: userInfo?.email,
                        })(
                            <Input
                                disabled={true}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="A small bit about you (max 300 characters)" required={true}>
                        {getFieldDecorator('about', {
                            initialValue: userInfo?.description,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter information about yourself.',
                                },
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    min: 40,
                                    message: 'Please use a longer description',
                                },
                                {
                                    max: 500,
                                    message: 'Description word limit reached',
                                },
                            ],
                        })(
                            <TextArea
                                style={{ height: '140px' }}
                                placeholder="Please enter information about yourself e.g. Your current role/occupation, skills, strengths and qualifications. "
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Contact information (e.g. Linkedin, Email, Twitter)" required={true}>
                        {getFieldDecorator('links', {
                            initialValue: userInfo?.contactLinks
                                ? userInfo.contactLinks
                                : `You can contact me at ${userInfo?.email ? userInfo?.email : ''}`,
                            rules: [
                                {
                                    required: true,
                                    message: 'We need your contact details!',
                                },
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    max: 300,
                                    message: 'Contact links character limit reached',
                                },
                            ],
                        })(
                            <TextArea
                                style={{ height: '100px' }}
                                placeholder="How should someone get in touch with you?"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Location" required={false}>
                        {getFieldDecorator('location', {
                            initialValue: userInfo?.location,
                            rules: [
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    max: 40,
                                    message: 'Location character limit reached',
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Location"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Skills" required={true}>
                        {getFieldDecorator('skills', {
                            initialValue: userInfo?.skillsTagIDs,
                            rules: [{ required: true, message: 'Please enter at least one skill' }],
                        })(
                            <Select showSearch={false} mode="multiple" placeholder="Please select" maxTagTextLength={0}>
                                {skillsFilterData.tagSet.tags.map((tag: string) => {
                                    return <Option key={tag}>{getDisplayTextFromTagID(tag)}</Option>;
                                })}
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label={hoursDisplayString} required={false}>
                        {getFieldDecorator('hours', {
                            initialValue: userInfo?.hoursPerWeekPercent ? userInfo?.hoursPerWeekPercent : 0,
                        })(
                            <Slider
                                tipFormatter={(percent: number): string => {
                                    return percentToWeeklyAvailableHours(percent);
                                }}
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <div>
                            {getFieldDecorator('listUser', {
                                valuePropName: 'checked',
                                initialValue: userInfo?.listUser !== undefined ? userInfo?.listUser : true,
                            })(<Checkbox />)}
                            <Text style={{ position: 'relative', left: '4px' }}>
                                I want to be listed as a publicly available volunteer.
                            </Text>
                        </div>
                    </Form.Item>

                    <div className="common-break-6px" />

                    {needsInit && (
                        <Form.Item>
                            {getFieldDecorator('accept', {
                                valuePropName: 'accept',
                                initialValue: 'false',
                                rules: [
                                    {
                                        validator: (rule, value, callback): void => {
                                            if (!value) {
                                                callback('Term must be accepted');
                                            }
                                            callback();
                                        },
                                        message: 'You must accept the terms to continue!',
                                    },
                                ],
                            })(
                                <div className="simple-flex-row-nowrap">
                                    <Checkbox />{' '}
                                    <Text style={{ position: 'relative', left: '4px', marginBottom: '12px' }}>
                                        I agree to my profile and the information submitted above to be publicly shared
                                        on the platform. I also agree to the{' '}
                                        <a target="_blank " href={PrivacyPolicyLink}>
                                            Privacy Statement
                                        </a>{' '}
                                        published on the website.
                                    </Text>
                                </div>,
                            )}
                        </Form.Item>
                    )}

                    <div className="common-break-16px" />

                    <Form.Item>
                        {!!userInfo && (
                            <Button type="primary" htmlType="submit">
                                Update my information
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

const UserProfileInputForm = Form.create({ name: 'user_profile' })(UserProfileFormImpl);

export const MyProfilePage: React.FC = () => {
    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>My profile</Title>
            <UserProfileInputForm />
        </div>
    );
};
