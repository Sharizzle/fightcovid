import React, { useContext } from 'react';
import { useReadFullVolunteerFromID } from '../../hooks/volunteerDataHooks';
import { Button, Card, Skeleton, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { LocationIcon } from '../../../svg-icons/location';
import { StringMultilineFragment } from '../string-multiline-fragment/string-multiline-fragment';
import { TagFlexList } from '../tag-flex-list/tag-flex-list';
import { TVolunteerRankAugmentedSignature } from '../../hooks/rankingHooks';
import { skillsFilterData } from '../../common/skills-info';
import { AnalyticsContext } from '../../app';
import { getUrlViaDynamicRouteAndParam, SingleVolunteerRoute } from '../../routing/route-mapping';

const { Text } = Typography;

export const VolunteersListItem: React.FC<{ rankedSignature?: TVolunteerRankAugmentedSignature }> = (props: {
    rankedSignature?: TVolunteerRankAugmentedSignature;
}) => {
    const volunteerUrl = getUrlViaDynamicRouteAndParam(SingleVolunteerRoute, props.rankedSignature?.signature.id);
    const volunteerData = useReadFullVolunteerFromID(props.rankedSignature?.signature.id);
    const userName = volunteerData ? volunteerData.name : '';

    const analytics = useContext(AnalyticsContext);

    const analyticsCallback: () => void = () => {
        if (analytics && !!volunteerData?.id) {
            analytics.logEvent('view_specific_volunteer_clicked', {
                volunteerId: volunteerData.id as string,
            });
        }
    };

    if (!volunteerData) {
        return <Skeleton loading />;
    }

    return (
        <>
            <Card className="single-volunteer-item-card" bordered={true}>
                <div className="single-volunteer-item-header">
                    <div className="volunteer-header-left">
                        <Link to={volunteerUrl}>
                            <div className="volunteer-name headline-3" onClick={analyticsCallback}>
                                {userName}
                            </div>
                        </Link>
                        {volunteerData?.location !== undefined && volunteerData?.location !== '' && (
                            <div>
                                <LocationIcon />
                                <Text className="volunteer-header-small-text">{volunteerData?.location}</Text>
                            </div>
                        )}
                    </div>
                    <Link to={volunteerUrl}>
                        <div className="see-more-button">
                            <Button>See more information</Button>
                        </div>
                    </Link>
                </div>
                <div className="common-break-4px" />
                <div className="volunteer-item-description">
                    <StringMultilineFragment text={volunteerData?.description} />
                </div>
                <div className="common-break-8px" />
                <Text className="common-text-big-bold">Highlighted skills:</Text>
                {props.rankedSignature?.signature.skillsTagIDs && (
                    <TagFlexList
                        tagList={props.rankedSignature?.signature.skillsTagIDs}
                        category={skillsFilterData.tagSet.category}
                        selectable
                    />
                )}
            </Card>
        </>
    );
};
