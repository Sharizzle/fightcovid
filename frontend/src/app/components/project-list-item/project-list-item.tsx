import React, { useContext } from 'react';
import { Button, Card, Icon, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { TagFlexList } from '../tag-flex-list/tag-flex-list';
import { StringMultilineFragment } from '../string-multiline-fragment/string-multiline-fragment';
import { LocationIcon } from '../../../svg-icons/location';
import { TProjectRankAugmentedSignature } from '../../hooks/rankingHooks';
import { useReadFullProjectFromID } from '../../hooks/projectDataHooks';
import { skillsFilterData } from '../../common/skills-info';
import { projectCategoryFilterData } from '../../common/project-info-types';
import { EditProjectsRoute, getUrlViaDynamicRouteAndParam, SingleProjectRoute } from '../../routing/route-mapping';
import { AnalyticsContext } from '../../app';

const { Text } = Typography;

export const ProjectListItem: React.FC<{
    rankedSignature?: TProjectRankAugmentedSignature;
    hideSideBorders?: boolean;
}> = (props: { rankedSignature?: TProjectRankAugmentedSignature; hideSideBorders?: boolean }) => {
    const signature = props.rankedSignature?.signature;

    const projectData = useReadFullProjectFromID(signature?.id);

    const fullProjectURLLink = getUrlViaDynamicRouteAndParam(SingleProjectRoute, signature?.id);
    const fullProjectEditURLLink = getUrlViaDynamicRouteAndParam(EditProjectsRoute, signature?.id);
    const title = projectData?.title ? projectData?.title : '';

    const locationText = projectData?.location ? projectData?.location : 'Whole UK';

    const isCurrentUsersProject = !!props.rankedSignature?.meta?.isCurrentUsersProject;

    const analytics = useContext(AnalyticsContext);

    const analyticsCallback: () => void = () => {
        if (analytics && !!projectData?.id) {
            analytics.logEvent('view_specific_project_clicked', {
                projectId: projectData.id as string,
            });
        }
    };

    if (!projectData) {
        return <Skeleton loading />;
    }

    return (
        <>
            <Card className="project-item-card">
                <div className="project-item-header">
                    <div className="project-item-header-left">
                        <div className="simple-flex-row-nowrap">
                            <Link to={fullProjectURLLink}>
                                <div className="project-name headline-3" onClick={analyticsCallback}>
                                    {title}
                                </div>
                            </Link>
                            {isCurrentUsersProject && (
                                <Link to={fullProjectEditURLLink}>
                                    <Icon className="edit-project-icon" type="edit" />
                                </Link>
                            )}
                        </div>
                        <div>
                            <LocationIcon />
                            <Text className="project-item-small-text">{locationText}</Text>
                        </div>
                    </div>
                    <Link to={fullProjectURLLink}>
                        <div className="see-more-button">
                            <Button onClick={analyticsCallback}>See more information</Button>
                        </div>
                    </Link>
                </div>
                <div className="project-item-description">
                    <StringMultilineFragment text={projectData?.shortDescription} />
                </div>
                <div className="project-item-footer">
                    <div>
                        <Text className="common-text-big-bold">Looking for:</Text>
                        {signature?.lookingForSkillsTagIDs && (
                            <TagFlexList
                                tagList={signature?.lookingForSkillsTagIDs}
                                category={skillsFilterData.tagSet.category}
                                selectable
                            />
                        )}
                    </div>
                    <div className="project-item-footer-right">
                        <Text className="tag-label-text">Helping with:</Text>
                        {signature?.categories && (
                            <TagFlexList
                                tagList={signature?.categories}
                                category={projectCategoryFilterData.tagSet.category}
                                selectable
                                reverse
                            />
                        )}
                    </div>
                </div>
            </Card>
        </>
    );
};
