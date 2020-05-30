import React from 'react';
import Linkify from 'react-linkify';

import { Typography } from 'antd';
const { Text } = Typography;

export const StringMultilineFragment: React.FC<{ text?: string }> = (props: { text?: string }) => {
    if (!props.text) {
        return (
            <>
                <Text />
            </>
        );
    }

    const mapped = props.text.split('\n').map((line: string, idx: number) => {
        return (
            <React.Fragment key={idx}>
                <Text>
                    <Linkify>{line}</Linkify>
                </Text>
                <div className="common-break-2px" />
            </React.Fragment>
        );
    });

    return <>{mapped}</>;
};
