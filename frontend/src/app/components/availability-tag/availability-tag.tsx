import React from 'react';
import { Badge, Tag } from 'antd';
import { getDisplayTextFromTagID } from '../../common/get-tag-display-text';

export const AvailabilityTag: React.FC<{ availabilityCategory: string }> = (props: {
    availabilityCategory: string;
}) => {
    const cn = 'availability-tag-' + props.availabilityCategory;
    const message = getDisplayTextFromTagID(props.availabilityCategory);
    return (
        <Tag className={cn}>
            <Badge color="#ffffff" />
            {message}
        </Tag>
    );
};
