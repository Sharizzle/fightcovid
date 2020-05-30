import Typography from 'antd/es/typography';
import React from 'react';
import { HeaderCard } from '../../components/header-card/header-card';
import { HeaderCardTitleText } from '../../components/header-card-title-text/header-card-title-text';
import { TTagSet } from '../../components/filter/filter';
import { QueryInputWrapper } from '../../components/query-input-wrapper/query-input-wrapper';
import { skillsFilterData } from '../../common/skills-info';
import { VolunteerListQueryProcessor } from '../../components/volunteer-list-query-processor/volunteer-list-query-processor';

const { Text } = Typography;

const AllVolunteersTopInfo: React.FC = () => {
    return (
        <>
            <HeaderCard>
                <div>
                    <HeaderCardTitleText text={'Volunteers ready to join the fight'} />
                    <div className="common-break-8px" />
                    <Text style={{ fontSize: '16px' }}>
                        The individuals listed below have offered to help out initiatives tackling COVID-19.
                    </Text>
                </div>
            </HeaderCard>
            <div className="common-break-16px" />
        </>
    );
};

const constructVolunteersList: (queryTags: Array<TTagSet>) => React.ReactNode = (queryTags: Array<TTagSet>) => {
    return <VolunteerListQueryProcessor filterTags={queryTags} />;
};

export const Volunteers: React.FC = () => {
    return (
        <>
            <AllVolunteersTopInfo />
            <QueryInputWrapper allFilterData={[skillsFilterData]} listConstructor={constructVolunteersList} />
        </>
    );
};
