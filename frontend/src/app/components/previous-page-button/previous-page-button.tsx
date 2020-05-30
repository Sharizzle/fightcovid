import { Icon, Typography } from 'antd';
import React, { useContext } from 'react';
import { AnalyticsContext } from '../../app';
import { useLocation } from 'react-router';
import { ListProjectsRoute, ListVolunteersRoute } from '../../routing/route-mapping';

const { Text } = Typography;

export const PreviousPageButton: React.FC<{ onClick: () => void }> = (props: { onClick: () => void }) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsWrappedCallback: () => void = () => {
        if (analytics) {
            if (pathname === ListVolunteersRoute.url) {
                analytics.logEvent('volunteer_previous_button_clicked');
            } else if (pathname === ListProjectsRoute.url) {
                analytics.logEvent('projects_previous_button_clicked');
            }
        }
        props.onClick();
    };

    return (
        <div className="previous-page-button-box" onClick={analyticsWrappedCallback}>
            <Icon className="previous-page-button-icon" type="left" />
            <Text className="previous-page-button-text">Previous</Text>
        </div>
    );
};
