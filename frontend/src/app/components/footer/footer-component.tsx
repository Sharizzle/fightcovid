import React from 'react';
import { Typography } from 'antd';
import { AboutRoute } from '../../routing/route-mapping';
import { Link } from 'react-router-dom';
const { Text } = Typography;

export const AppFooter: React.FC = () => {
    return (
        <div className="app-footer-content">
            <Text>
                Fight COVID UK is an independent initiative. It is not affiliated with the UK government. For more
                information, including a disclaimer, visit the <Link to={AboutRoute.url}>about</Link> page
            </Text>
        </div>
    );
};
