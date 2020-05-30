import { Card } from 'antd';
import React from 'react';

export const HeaderCard: React.FC<{ children?: React.ReactNode }> = (props) => {
    return (
        <Card className="common-border-shadow" size="small">
            <div
                className="simple-flex-row-wrap"
                style={{ justifyContent: 'space-between', marginTop: '15px', marginBottom: '15px' }}
            >
                {props?.children}
            </div>
        </Card>
    );
};
