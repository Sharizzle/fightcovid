import React from 'react';
import { Divider } from 'antd';
import { HeaderCard } from '../header-card/header-card';
import { HeaderCardTitleText } from '../header-card-title-text/header-card-title-text';
import { TagFlexList } from '../tag-flex-list/tag-flex-list';

export type TTagSet = { category: string; tags: Array<string> };
export type TFilterData = { title: string; tagSet: TTagSet };

export const Filter: React.FC<{
    filterData: TFilterData;
}> = (props: { filterData: TFilterData }) => {
    return (
        <HeaderCard>
            <div className="simple-flex-row-wrap">
                <HeaderCardTitleText text={props.filterData.title} />
            </div>
            <Divider className="filter-divider-style" />
            <TagFlexList
                tagList={props.filterData.tagSet.tags}
                category={props.filterData.tagSet.category}
                selectable
            />
        </HeaderCard>
    );
};
