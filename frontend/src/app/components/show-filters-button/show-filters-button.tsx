import { Icon, Typography } from 'antd';
import React, { useContext } from 'react';
import { AnalyticsContext } from '../../app';
import { useLocation } from 'react-router';

const { Text } = Typography;

export const ShowFiltersButton: React.FC<{ show: boolean; onClick: () => void }> = (props: {
    show: boolean;
    onClick: () => void;
}) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('show_filters_clicked', {
                location: pathname,
            });
        }
        props.onClick();
    };

    return (
        <div className="show-filters-button-box" onClick={analyticsCallback}>
            <Text className="show-filters-button-text">{props.show ? 'Close' : 'Show'} filters</Text>
            <Icon className="show-filters-button-icon" type="down" rotate={props.show ? 180 : 0} />
        </div>
    );
};
