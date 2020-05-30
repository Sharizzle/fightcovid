import { Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const HeaderCardTitleText: React.FC<{ text: string }> = (props: { text: string }) => {
    return <Text className="header-card-title-text">{props.text}</Text>;
};
