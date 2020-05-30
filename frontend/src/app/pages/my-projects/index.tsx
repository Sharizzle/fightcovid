import React from 'react';
import { TProjectSig } from '../../common/project-info-types';
import { ProjectListItem } from '../../components/project-list-item/project-list-item';
import { Typography, Skeleton, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CreateProjectsRoute } from '../../routing/route-mapping';
import { useReadCurrentUsersProjects } from '../../hooks/projectDataHooks';
import { TProjectRankAugmentedSignature } from '../../hooks/rankingHooks';

const { Title } = Typography;

export const MyProjectsPage: React.FC = () => {
    const projectData = useReadCurrentUsersProjects();

    if (!projectData) {
        return <Skeleton active={true} />;
    }

    if (!!projectData && projectData.length == 0) {
        return (
            <div className="simple-flex-column-align-center-nowrap-upper">
                <Title level={2}>You have no projects!</Title>
                <div style={{ margin: '10px', position: 'relative' }}>
                    <Link to={CreateProjectsRoute.url} key={CreateProjectsRoute.id}>
                        <Button className="app-main-menu-login-sign-up-button" type="primary">
                            Create a project
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // TODO: This is kind of a hack...
    const makeDummyRankAugment = (projectSig): TProjectRankAugmentedSignature => {
        return {
            meta: {
                matchesSkills: false,
                isCurrentUsersProject: true,
            },
            score: 0,
            signature: projectSig,
        };
    };

    return (
        <>
            <div className="simple-flex-column-align-center-nowrap-upper">
                <Title level={2}>My projects</Title>
                <Link to={CreateProjectsRoute.url} key={CreateProjectsRoute.id}>
                    <Button className="app-main-menu-login-sign-up-button" type="primary">
                        Create a project
                    </Button>
                </Link>
            </div>
            <div>
                {!!projectData && projectData.length >= 0 ? (
                    projectData.map((projectSig: TProjectSig) => (
                        <ProjectListItem
                            key={projectSig.id}
                            rankedSignature={makeDummyRankAugment(projectSig)}
                            hideSideBorders={true}
                        />
                    ))
                ) : (
                    <>
                        <Skeleton active={true} />
                        <Skeleton active={true} />
                    </>
                )}
            </div>
        </>
    );
};
