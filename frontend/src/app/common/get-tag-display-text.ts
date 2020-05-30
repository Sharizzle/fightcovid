import { projectCategoryTagDisplayMap, stageCategoryTagDisplayTextMap } from './project-info-types';
import { skillsCategoryTagDisplayTextMap } from './skills-info';
import { availabilityTagDisplayTextMap } from './volunteer-into-types';

export const getDisplayTextFromTagID: (tagID?: string) => string = (tagID?: string) => {
    if (!tagID) {
        return '';
    }
    if (projectCategoryTagDisplayMap.get(tagID) !== undefined) {
        return projectCategoryTagDisplayMap.get(tagID) || '';
    }
    if (stageCategoryTagDisplayTextMap.get(tagID) !== undefined) {
        return stageCategoryTagDisplayTextMap.get(tagID) || '';
    }
    if (skillsCategoryTagDisplayTextMap.get(tagID) !== undefined) {
        return skillsCategoryTagDisplayTextMap.get(tagID) || '';
    }
    if (availabilityTagDisplayTextMap.get(tagID) !== undefined) {
        return availabilityTagDisplayTextMap.get(tagID) || '';
    }
    return tagID;
};

export const tagListUnwind: (tags?: Array<string>) => string = (tags?: Array<string>) => {
    let tagStr = '';
    if (!!tags && tags.length > 0) {
        tags.forEach((tag: string) => {
            tagStr += getDisplayTextFromTagID(tag) + ', ';
        });
        tagStr = tagStr.slice(0, tagStr.length - 2);
    }
    return tagStr;
};
