import React, { useContext } from 'react';
import { Badge, Tag } from 'antd';
import { getDisplayTextFromTagID } from '../../common/get-tag-display-text';
import { SelectedTagStateContext } from '../query-input-wrapper/query-input-wrapper';
import { TTagSet } from '../filter/filter';
import { AnalyticsContext } from '../../app';
import { useLocation } from 'react-router';

// TODO: The antd badge colour is weird... you seem to be forced to use a colour string, but overriding this in CSS
//       is more consistent the rest of the project (avoiding inline styles). We just override this in CSS for now.
const badgeColour = '#555555';

export const TagFlexList: React.FC<{
    tagList: Array<string>;
    category: string;
    reverse?: boolean;
    selectable?: boolean;
}> = (props: { tagList: Array<string>; category: string; reverse?: boolean; selectable?: boolean }) => {
    const selectedTagStateContext = useContext(SelectedTagStateContext);
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const relevantSelectedTagSet = selectedTagStateContext.selectedTags.find(
        (tagSet: TTagSet) => tagSet.category === props.category,
    );
    const relevantSelectedTagIds = relevantSelectedTagSet ? relevantSelectedTagSet.tags : [];

    const selectedContainsTags: (tagId: string) => boolean = (tagId: string) => {
        return relevantSelectedTagIds.includes(tagId);
    };

    const selectTag: (tagId: string, category: string) => void = (tagId: string, category: string) => {
        if (!!props.selectable) {
            selectedTagStateContext.selectTag(tagId, category);
        }
        if (!!props.selectable && analytics) {
            analytics.logEvent('tag_select_click', {
                tagId: tagId,
                location: pathname,
            });
        }
        if (!props.selectable && analytics) {
            analytics.logEvent('tag_unselectable_click', {
                tagId: tagId,
                location: pathname,
            });
        }
    };

    const unselectTag: (tagId: string, category: string) => void = (tagId: string, category: string) => {
        if (!!props.selectable) {
            selectedTagStateContext.unselectTag(tagId, category);
        }
        if (!!props.selectable && analytics) {
            analytics.logEvent('tag_unselect_click', {
                tagId: tagId,
                location: pathname,
            });
        }
    };

    return (
        <div className="tag-flex-list-container" style={{ flexDirection: !!props.reverse ? 'row-reverse' : 'row' }}>
            {props.tagList
                .concat()
                .sort()
                .map((tagID: string) => {
                    if (selectedContainsTags(tagID)) {
                        return (
                            <Tag
                                className="tag-flex-list-tag-selected"
                                key={tagID}
                                onClick={(): void => unselectTag(tagID, props.category)}
                            >
                                <Badge color={badgeColour} />
                                {getDisplayTextFromTagID(tagID)}
                            </Tag>
                        );
                    }

                    return (
                        <Tag
                            className="tag-flex-list-tag-unselected"
                            key={tagID}
                            onClick={(): void => selectTag(tagID, props.category)}
                        >
                            <Badge color={badgeColour} />
                            {getDisplayTextFromTagID(tagID)}
                        </Tag>
                    );
                })}
        </div>
    );
};
