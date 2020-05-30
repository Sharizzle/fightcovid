import { Icon, Typography } from 'antd';
import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import { AnalyticsContext } from '../../app';
import { ListProjectsRoute, ListVolunteersRoute } from '../../routing/route-mapping';

const { Text } = Typography;

export const NextPageButton: React.FC<{ onClick: () => void }> = (props: { onClick: () => void }) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsWrappedCallback: () => void = () => {
        if (analytics) {
            if (pathname === ListVolunteersRoute.url) {
                analytics.logEvent('volunteer_next_button_clicked');
            } else if (pathname === ListProjectsRoute.url) {
                analytics.logEvent('projects_next_button_clicked');
            }
        }
        props.onClick();
    };

    return (
        <div className="next-page-button-box" onClick={analyticsWrappedCallback}>
            <Text className="next-page-button-text">Next</Text>
            <Icon className="next-page-button-icon" type="right" />
        </div>
    );
};
