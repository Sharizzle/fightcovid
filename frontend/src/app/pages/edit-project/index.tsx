import React, { FormEvent, useState } from 'react';
import Typography from 'antd/es/typography';
import { FormComponentProps } from 'antd/lib/form';
import { Button, Form, Icon, Input, Modal, notification, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { skillsFilterData } from '../../common/skills-info';
import { getDisplayTextFromTagID } from '../../common/get-tag-display-text';
const { Title, Text } = Typography;
const { Option } = Select;

import { projectCategoryFilterData, stageFilterData, TProjectInfo } from '../../common/project-info-types';
import { useRedirect } from '../../hooks/useRedirect';
import { useLocation } from 'react-router-dom';
import { findParameterValueFromDynamicUrl, ListProjectsRoute, MyProjectsRoute } from '../../routing/route-mapping';
import { useAuthUser } from '../../hooks/authHooks';
import { useDeleteProject, useReadFullProjectFromID, useUpdateProject } from '../../hooks/projectDataHooks';

// TODO: A LOT of code duplication here... also inline styles...

const updatedNotificationIcon = (): void => {
    notification['success']({
        message: 'Project successfully edited',
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

const deleteNotificationIcon = (): void => {
    notification['success']({
        message: 'Project successfully deleted',
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

const EditProjectFormImpl = (props: FormComponentProps): React.ReactElement => {
    const { form } = props;
    const { getFieldDecorator, validateFields } = form;

    const { pathname } = useLocation();
    const id = findParameterValueFromDynamicUrl(pathname);
    const projectInfo = useReadFullProjectFromID(id);

    const redirect = useRedirect();

    const { initializing, authUser } = useAuthUser();

    if (!initializing && projectInfo && authUser?.uid !== projectInfo.createdBy) {
        redirect(ListProjectsRoute.url);
    }

    const updateProject = useUpdateProject();
    const deleteProject = useDeleteProject();

    const [showDeleteProjectFlow, setShowDeleteProjectFlow] = useState(false);

    const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!!projectInfo && !err) {
                const updatedProjectInfo: TProjectInfo = {
                    id: projectInfo?.id,
                    title: values.title,
                    shortDescription: values.shortDescription,
                    stage: values.stage || '',
                    categories: values.categories || [],
                    lookingForSkillsTagIDs: values.lookingForSkillsTagsIDs,
                    location: values.location || '',
                    description: values.description || '',
                    contactInfo: values.contactInfo || '',
                    createdBy: projectInfo?.createdBy,
                } as TProjectInfo;
                updateProject(updatedProjectInfo).then(() => {
                    redirect(MyProjectsRoute.url);
                    updatedNotificationIcon();
                });
            }
        });
    };

    return (
        <>
            <div className="center-info-container">
                <Modal
                    cancelText="Go back"
                    onCancel={(): void => setShowDeleteProjectFlow(false)}
                    onOk={(): void => {
                        if (id !== undefined) {
                            deleteProject(id).then(() => {
                                deleteNotificationIcon();
                                redirect(MyProjectsRoute.url);
                            });
                        }
                    }}
                    title="Are you sure you want to delete this project?"
                    visible={showDeleteProjectFlow}
                    okText="Yes, I want to delete the project"
                >
                    <Text>Deleting your project is permanent.</Text>
                </Modal>
                <Form onSubmit={onSubmit} className="mid-width-info">
                    <Form.Item label="Project title" required={true}>
                        {getFieldDecorator('title', {
                            initialValue: projectInfo?.title,
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
                                placeholder="Please enter your name"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item label="Brief description" required={true}>
                        {getFieldDecorator('shortDescription', {
                            initialValue: projectInfo?.shortDescription,
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

                    <Form.Item label="Stage" required={true}>
                        {getFieldDecorator('stage', {
                            initialValue: projectInfo?.stage,
                            rules: [
                                {
                                    required: true,
                                    message: 'Please indicate project stage',
                                },
                            ],
                        })(
                            <Select showSearch={false} placeholder="Please select">
                                {stageFilterData.tagSet.tags.map((tag: string) => {
                                    return <Option key={tag}>{getDisplayTextFromTagID(tag)}</Option>;
                                })}
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item label="Category" required={true}>
                        {getFieldDecorator('categories', {
                            initialValue: projectInfo?.categories,
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
                            initialValue: projectInfo?.lookingForSkillsTagIDs,
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
                            initialValue: projectInfo?.location,
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
                            initialValue: projectInfo?.description,
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
                            initialValue: projectInfo?.contactInfo,
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

                    <div className="simple-flex-row-wrap-content-apart">
                        <Form.Item>
                            {!!projectInfo && !initializing && (
                                <Button type="primary" htmlType="submit">
                                    Edit the project
                                </Button>
                            )}
                        </Form.Item>

                        <Button onClick={(): void => setShowDeleteProjectFlow(true)} ghost type="danger">
                            Delete the project
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

const EditProjectInputForm = Form.create({ name: 'user_profile' })(EditProjectFormImpl);

export const EditProjectPage: React.FC = () => {
    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>Edit a project</Title>
            <EditProjectInputForm />
        </div>
    );
};
