import React, { ReactNodeArray } from 'react';
import { Divider, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { StringMultilineFragment } from '../string-multiline-fragment/string-multiline-fragment';
import { TagFlexList } from '../tag-flex-list/tag-flex-list';
import { TProjectInfo } from '../../common/project-info-types';
import { getUrlViaDynamicRouteAndParam, SingleProjectRoute } from '../../routing/route-mapping';
import { AnalyticsAwareLink } from '../analytics-aware-link/analytics-aware-link';

const { Text } = Typography;

// TODO: This could probably be refactored.

export const GridAlignedText: React.FC<{ title?: string; text?: string }> = (props: {
    title?: string;
    text?: string;
}) => {
    if (!props.title || !props.text) {
        return null;
    }
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <div>
                    <StringMultilineFragment text={props.text} />
                </div>
            </div>
            <Divider />
        </>
    );
};

export const GridAlignedMandatoryTextNoDivider: React.FC<{ title?: string; text?: string }> = (props: {
    title?: string;
    text?: string;
}) => {
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <div>
                    <StringMultilineFragment text={props.text} />
                </div>
            </div>
        </>
    );
};

export const GridAlignedLinkText: React.FC<{ title?: string; text?: string; to: string }> = (props: {
    title?: string;
    text?: string;
    to?: string;
}) => {
    if (!props.title || !props.text || !props?.to) {
        return null;
    }
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <div>
                    <AnalyticsAwareLink to={props.to} logTag={`GALT; ${props.to}`} linkText={props.text} />
                </div>
            </div>
            <Divider />
        </>
    );
};

export const GridAlignedTagList: React.FC<{
    title?: string;
    tagIDs?: Array<string>;
    category: string;
    selectable?: boolean;
}> = (props: { title?: string; tagIDs?: Array<string>; category: string; selectable?: boolean }) => {
    if (!props.title || !props.tagIDs) {
        return null;
    }
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <TagFlexList tagList={props.tagIDs} category={props.category} selectable={props.selectable} />
            </div>
            <Divider />
        </>
    );
};

export const GridAlignedTagListMandatoryNoDivider: React.FC<{
    title?: string;
    tagIDs?: Array<string>;
    category: string;
    selectable?: boolean;
}> = (props: { title?: string; tagIDs?: Array<string>; category: string; selectable?: boolean }) => {
    if (!props.title || !props.tagIDs) {
        return null;
    }
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <TagFlexList tagList={props.tagIDs} category={props.category} selectable={props.selectable} />
            </div>
        </>
    );
};

export const GridAlignedComponent: React.FC<{ title?: string; component: React.ReactElement }> = (props: {
    title?: string;
    component?: React.ReactElement;
}) => {
    if (!props.title || !props.component) {
        return null;
    }
    return (
        <>
            <div className="simple-flex-row-responsive-wrap">
                <div className="left-column-with-wrap">
                    <Text strong>{props.title}: </Text>
                </div>
                <div>{props.component}</div>
            </div>
        </>
    );
};

export const GridAlignedProjectLinkList: React.FC<{ projectInfos?: Array<TProjectInfo> }> = (props: {
    projectInfos?: Array<TProjectInfo>;
}) => {
    const links = [] as ReactNodeArray;
    if (!!props.projectInfos && props.projectInfos.length > 0) {
        for (let i = 0; i < props.projectInfos.length - 1; ++i) {
            const projectInfo = props.projectInfos[i];
            const projectLink = getUrlViaDynamicRouteAndParam(SingleProjectRoute, projectInfo.id);
            links.push(
                <Link key={projectInfo.id} to={projectLink}>
                    <Text>{projectInfo.title}, </Text>
                </Link>,
            );
        }
        const projectInfo = props.projectInfos[props.projectInfos.length - 1];
        const projectLink = getUrlViaDynamicRouteAndParam(SingleProjectRoute, projectInfo.id);
        links.push(
            <AnalyticsAwareLink
                key={projectInfo.id}
                to={projectLink}
                logTag={`GAPLL; ${projectInfo.id}`}
                linkText={projectInfo.title}
            />,
        );
        return (
            <>
                <div className="simple-flex-row-responsive-wrap">
                    <div className="left-column-with-wrap">
                        <Text strong>Projects created: </Text>
                    </div>
                    <>{links}</>
                </div>
                <Divider />
            </>
        );
    }
    return <>{links}</>;
};
