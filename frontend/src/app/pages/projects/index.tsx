import Typography from 'antd/es/typography';
import React from 'react';
import { HeaderCard } from '../../components/header-card/header-card';
import { HeaderCardTitleText } from '../../components/header-card-title-text/header-card-title-text';
import { projectCategoryFilterData, stageFilterData } from '../../common/project-info-types';
import { skillsFilterData } from '../../common/skills-info';
import { QueryInputWrapper } from '../../components/query-input-wrapper/query-input-wrapper';
import { TTagSet } from '../../components/filter/filter';
import { ProjectListQueryProcessor } from '../../components/project-list-query-processor/project-list-query-processor';
import { CreateProjectsRoute } from '../../routing/route-mapping';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const { Text } = Typography;

const AllProjectTopInfo: React.FC = () => {
    return (
        <>
            <HeaderCard>
                <div>
                    <HeaderCardTitleText text="Projects looking for volunteers" />
                    <div className="common-break-8px" />
                    <Text style={{ fontSize: '16px' }}>
                        The projects listed below are tackling COVID-related issues and are looking for support.
                        Volunteer to help or list your own.
                    </Text>
                </div>
                <div style={{ marginTop: '10px', position: 'relative', right: '0px' }}>
                    <Link to={CreateProjectsRoute.url} key={CreateProjectsRoute.id}>
                        <Button type="primary">Create a project</Button>
                    </Link>
                </div>
            </HeaderCard>
            <div className="common-break-16px" />
        </>
    );
};

const constructProjectList: (queryTags: Array<TTagSet>) => React.ReactNode = (queryTags: Array<TTagSet>) => {
    return <ProjectListQueryProcessor filterTags={queryTags} />;
};

export const Projects: React.FC = () => {
    return (
        <>
            <AllProjectTopInfo />
            <QueryInputWrapper
                allFilterData={[skillsFilterData, projectCategoryFilterData, stageFilterData]}
                listConstructor={constructProjectList}
            />
        </>
    );
};
