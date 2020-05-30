import React, { FormEvent } from 'react';
import Typography from 'antd/es/typography';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Form, Icon, Input, notification, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { skillsFilterData } from '../../common/skills-info';
import { getDisplayTextFromTagID } from '../../common/get-tag-display-text';
const { Title } = Typography;
const { Option } = Select;

import { useReadCurrentUserInfo } from '../../hooks/currentUserHooks';
import { projectCategoryFilterData, stageFilterData, TProjectInfo } from '../../common/project-info-types';
import { useRedirect } from '../../hooks/useRedirect';
import { useCreateProject } from '../../hooks/projectDataHooks';
import { MyProjectsRoute } from '../../routing/route-mapping';

const openNotificationWithIcon = (): void => {
    notification['success']({
        message: 'Project successfully created',
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

// TODO: This could / should probably be moved into a hook.

const CreateProjectFormImpl = (props: FormComponentProps): React.ReactElement => {
    const { form } = props;
    const { getFieldDecorator, validateFields } = form;

    const userInfo = useReadCurrentUserInfo();
    const createProject = useCreateProject();
    const redirect = useRedirect();

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!!userInfo && !err) {
                const projectInfo: TProjectInfo = {
                    id: '',
                    title: values.title,
                    shortDescription: values.shortDescription,
                    stage: values.stage || '',
                    categories: values.categories || [],
                    lookingForSkillsTagIDs: values.lookingForSkillsTagsIDs,
                    location: values.location || '',
                    description: values.description || '',
                    contactInfo: values.contactInfo || '',
                    createdBy: userInfo.id,
                } as TProjectInfo;
                createProject(projectInfo).then(() => {
                    redirect(MyProjectsRoute.url);
                    openNotificationWithIcon();
                });
            }

            if (!userInfo) {
                console.error('Trying to submit with undefined my-profile. Very strange.');
            }
        });
    };

    return (
        <>
            <div className="center-info-container">
                <Form onSubmit={onSubmit} className="mid-width-info">
                    <Form.Item label="Project title" required={true}>
                        {getFieldDecorator('title', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter a title for the project.',
                                },
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    max: 64,
                                    message: 'Project name too long!',
                                },
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Please enter the project's name"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Brief description" required={true}>
                        {getFieldDecorator('shortDescription', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please give a brief description about the project.',
                                },
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    min: 12,
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
                                placeholder="Please give a brief description about the project. This is the summary visible in the projects list. Feel free to include links to external documents."
                            />,
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Stage (Note: 'Established' means you were an established business before the crisis)"
                        required={true}
                    >
                        {getFieldDecorator('stage', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please indicate project stage',
                                },
                            ],
                        })(
                            // TODO: THIS IS NOT GREAT
                            <Select showSearch={false} placeholder="Please select">
                                {stageFilterData.tagSet.tags.map((tag: string) => {
                                    return <Option key={tag}>{getDisplayTextFromTagID(tag)}</Option>;
                                })}
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label="Category" required={true}>
                        {getFieldDecorator('categories', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please indicate project category',
                                },
                            ],
                        })(
                            <Select showSearch={false} mode="multiple" placeholder="Please select" maxTagTextLength={0}>
                                {projectCategoryFilterData.tagSet.tags.map((tag: string) => {
                                    return <Option key={tag}>{getDisplayTextFromTagID(tag)}</Option>;
                                })}
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label="Skills needed" required={true}>
                        {getFieldDecorator('lookingForSkillsTagsIDs', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please indicate the skills needed',
                                },
                            ],
                        })(
                            <Select showSearch={false} mode="multiple" placeholder="Please select" maxTagTextLength={0}>
                                {skillsFilterData.tagSet.tags.map((tag: string) => {
                                    return <Option key={tag}>{getDisplayTextFromTagID(tag)}</Option>;
                                })}
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label="Location" required={false}>
                        {getFieldDecorator('location', {
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

                    <Form.Item label="Extended description" required={false}>
                        {getFieldDecorator('description', {
                            rules: [
                                {
                                    whitespace: true,
                                    message: 'Invalid whitespace.',
                                },
                                {
                                    max: 2000,
                                    message: 'Description character limit reached',
                                },
                            ],
                        })(
                            <TextArea
                                style={{ height: '240px' }}
                                placeholder="Please enter more information about the project"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Contact links (e.g. Linkedin, Email, Twitter)" required={true}>
                        {getFieldDecorator('contactInfo', {
                            initialValue: userInfo?.contactLinks
                                ? userInfo.contactLinks
                                : `You can contact me at ${userInfo?.email ? userInfo?.email : ''}`,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please tell us how to get in contact',
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
                                placeholder="Please enter information about yourself."
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {!!userInfo && (
                            <Button type="primary" htmlType="submit">
                                Create the project!
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

const CreateProjectInputForm = Form.create({ name: 'user_profile' })(CreateProjectFormImpl);

export const CreateProjectPage: React.FC = () => {
    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>Create a project</Title>
            <CreateProjectInputForm />
        </div>
    );
};
