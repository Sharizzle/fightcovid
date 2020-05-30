import React from 'react';
import { projectCategoryFilterData, stageFilterData, TProjectSig } from '../../common/project-info-types';
import { TTagSet } from '../filter/filter';
import { skillsFilterData } from '../../common/skills-info';
import { SignatureListPaginator } from '../signature-list-paginator/signature-list-paginator';
import { ProjectListItem } from '../project-list-item/project-list-item';
import {
    TProjectRankAugmentedSignature,
    TVolunteerRankAugmentedSignature,
    useRankProjectSignatures,
} from '../../hooks/rankingHooks';
import { useReadProjectSignatures } from '../../hooks/projectDataHooks';

function filterProjects(projectSigs: Array<TProjectSig>, filterTags: Array<TTagSet>): Array<TProjectSig> {
    const skillsTags = filterTags.find((tag: TTagSet) => tag.category === skillsFilterData.tagSet.category);
    const stageTags = filterTags.find((tag: TTagSet) => tag.category === stageFilterData.tagSet.category);
    const categoryTags = filterTags.find((tag: TTagSet) => tag.category === projectCategoryFilterData.tagSet.category);
    return projectSigs.filter((sig: TProjectSig) => {
        if (!skillsTags || !stageTags || !categoryTags) {
            return false;
        }
        return (
            skillsTags.tags.every((tagId: string) => sig.lookingForSkillsTagIDs.includes(tagId)) &&
            stageTags.tags.every((tagId: string) => sig.stage.includes(tagId)) &&
            categoryTags.tags.every((tagId: string) => sig.categories.includes(tagId))
        );
    });
}

const projectItemCreator = (
    rankedSig: TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature,
): React.ReactElement => <ProjectListItem rankedSignature={rankedSig as TProjectRankAugmentedSignature} />;

export const ProjectListQueryProcessor: React.FC<{
    filterTags: Array<TTagSet>;
}> = (props: { filterTags: Array<TTagSet> }) => {
    const { filterTags } = props;
    const projectSigs = useReadProjectSignatures();
    const filteredProjectSigs = !!projectSigs ? filterProjects(projectSigs, filterTags) : undefined;
    const queryResultSize = !!filteredProjectSigs ? filteredProjectSigs.length : 0;

    const rankedProjects = useRankProjectSignatures(filteredProjectSigs);

    return (
        <SignatureListPaginator
            queryResultSize={queryResultSize}
            rankedSignatureData={rankedProjects}
            listItemCreator={projectItemCreator}
        />
    );
};
