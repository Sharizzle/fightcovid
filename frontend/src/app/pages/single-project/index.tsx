import Typography from 'antd/es/typography';
import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    findParameterValueFromDynamicUrl,
    getUrlViaDynamicRouteAndParam,
    SingleVolunteerRoute,
} from '../../routing/route-mapping';
import { useReadFullVolunteerFromID } from '../../hooks/volunteerDataHooks';
import { Card, Skeleton } from 'antd';
import {
    GridAlignedLinkText,
    GridAlignedMandatoryTextNoDivider,
    GridAlignedTagList,
    GridAlignedText,
} from '../../components/grid-aligned-text/grid-aligned-text';
import { useReadFullProjectFromID } from '../../hooks/projectDataHooks';
import { skillsFilterData } from '../../common/skills-info';
import { projectCategoryFilterData, stageFilterData } from '../../common/project-info-types';

const { Title } = Typography;

export const SingleProject: React.FC = () => {
    const { pathname } = useLocation();
    const id = findParameterValueFromDynamicUrl(pathname);
    if (!id) {
        return <Title level={3}>Error loading project</Title>;
    }
    const projectInfo = useReadFullProjectFromID(id);
    const creatorInfo = useReadFullVolunteerFromID(projectInfo?.createdBy);
    const creatorVolunteerPageURL = getUrlViaDynamicRouteAndParam(SingleVolunteerRoute, creatorInfo?.id);

    if (!projectInfo) {
        return <Skeleton loading={true} />;
    }

    return (
        <div className="simple-flex-column-align-center-nowrap-upper single-project">
            <Title level={3}>Project: {projectInfo?.title}</Title>
            <div className="center-info-container">
                <Card bordered={false} className="wide-info">
                    <GridAlignedText title="Project" text={projectInfo?.title} />
                    <GridAlignedLinkText title="Created by" text={creatorInfo?.name} to={creatorVolunteerPageURL} />
                    <GridAlignedText title="Description" text={projectInfo?.shortDescription} />
                    <GridAlignedText title="Contact links" text={projectInfo?.contactInfo} />
                    <GridAlignedTagList
                        title="Skills needed"
                        tagIDs={projectInfo?.lookingForSkillsTagIDs}
                        category={skillsFilterData.tagSet.category}
                    />
                    <GridAlignedTagList
                        title="Stage"
                        tagIDs={projectInfo?.stage ? [projectInfo.stage] : undefined}
                        category={stageFilterData.tagSet.category}
                    />
                    <GridAlignedTagList
                        title="Categories"
                        tagIDs={projectInfo?.categories}
                        category={projectCategoryFilterData.tagSet.category}
                    />
                    <GridAlignedMandatoryTextNoDivider title="Extended description" text={projectInfo?.description} />
                </Card>
            </div>
        </div>
    );
};
