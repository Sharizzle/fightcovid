import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { AnalyticsContext } from '../../app';

export const AnalyticsAwareLink: React.FC<{ to: string; logTag: string; linkText: string }> = (props: {
    to: string;
    logTag: string;
    linkText: string;
}) => {
    const { to, logTag, linkText } = props;
    const analytics = useContext(AnalyticsContext);
    const analyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent(`Clicked link with tag: ${logTag}`);
        }
    };
    return (
        <span onClick={analyticsCallback}>
            <Link to={to}>{linkText}</Link>
        </span>
    );
};
