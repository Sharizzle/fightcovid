import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CreateProjectsRoute, findParameterValueFromDynamicUrl } from '../../routing/route-mapping';
import { useReadFullVolunteerFromID } from '../../hooks/volunteerDataHooks';
import { Button, Card, Divider, Skeleton, Typography } from 'antd';
import {
    GridAlignedComponent,
    GridAlignedProjectLinkList,
    GridAlignedTagListMandatoryNoDivider,
    GridAlignedText,
} from '../../components/grid-aligned-text/grid-aligned-text';
import { useHasCurrentUserCreatedAProject, useReadProjectsOfUserByID } from '../../hooks/projectDataHooks';
import { skillsFilterData } from '../../common/skills-info';

const { Title } = Typography;

export const SingleUser: React.FC = () => {
    const { pathname } = useLocation();
    const id = findParameterValueFromDynamicUrl(pathname);
    if (!id) {
        return <Title level={3}>Error loading user</Title>;
    }
    const userInfo = useReadFullVolunteerFromID(id);
    const projectsOfUser = useReadProjectsOfUserByID(id);
    const hasCurrentUserCreatedAProject = useHasCurrentUserCreatedAProject();

    if (!userInfo) {
        return <Skeleton className="wide-info" loading={true} />;
    }

    return (
        <div className="simple-flex-column-align-center-nowrap-upper single-user">
            <Title level={3}>{userInfo?.name}</Title>
            <div className="center-info-container">
                <Card bordered={false} className="wide-info">
                    <GridAlignedText title="Name" text={userInfo?.name} />
                    <GridAlignedText title="About me" text={userInfo?.description} />
                    {hasCurrentUserCreatedAProject ? (
                        <GridAlignedText title="Contact information" text={userInfo?.contactLinks} />
                    ) : (
                        <>
                            <GridAlignedComponent
                                title="Contact information"
                                component={
                                    <Link to={CreateProjectsRoute.url}>
                                        <Button className="force-create-project-button" type="primary">
                                            Create a project to view contact details!
                                        </Button>
                                    </Link>
                                }
                            />
                            <Divider className="single-user-divider" />
                        </>
                    )}
                    <GridAlignedText title="Location" text={userInfo.location} />
                    <GridAlignedProjectLinkList projectInfos={projectsOfUser} />
                    <GridAlignedTagListMandatoryNoDivider
                        title="Skills needed"
                        tagIDs={userInfo?.skillsTagIDs}
                        category={skillsFilterData.tagSet.category}
                    />
                </Card>
            </div>
        </div>
    );
};
