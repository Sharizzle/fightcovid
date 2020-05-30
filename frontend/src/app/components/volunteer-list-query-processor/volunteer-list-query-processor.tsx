import React from 'react';
import { TTagSet } from '../filter/filter';
import { TUserSig } from '../../common/volunteer-into-types';
import { skillsFilterData } from '../../common/skills-info';
import { useReadVolunteerSignatures } from '../../hooks/volunteerDataHooks';
import { SignatureListPaginator } from '../signature-list-paginator/signature-list-paginator';
import {
    TProjectRankAugmentedSignature,
    TVolunteerRankAugmentedSignature,
    useRankVolunteerSignatures,
} from '../../hooks/rankingHooks';
import { VolunteersListItem } from '../volunteer-list-item/volunteer-list-item';

function filterVolunteers(volunteerSigs: Array<TUserSig>, filterTags: Array<TTagSet>): Array<TUserSig> {
    const skillsTags = filterTags.find((tag: TTagSet) => tag.category === skillsFilterData.tagSet.category);
    return volunteerSigs.filter((sig: TUserSig) => {
        return sig.listUser && skillsTags && skillsTags.tags.every((tagId: string) => sig.skillsTagIDs.includes(tagId));
    });
}

const volunteerItemCreator = (
    rankedSig: TProjectRankAugmentedSignature | TVolunteerRankAugmentedSignature,
): React.ReactElement => <VolunteersListItem rankedSignature={rankedSig as TVolunteerRankAugmentedSignature} />;

export const VolunteerListQueryProcessor: React.FC<{ filterTags: Array<TTagSet> }> = (props: {
    filterTags: Array<TTagSet>;
}) => {
    const volunteerSigs = useReadVolunteerSignatures();
    const filteredVolunteerSigs = !!volunteerSigs ? filterVolunteers(volunteerSigs, props.filterTags) : undefined;
    const queryResultSize = !!filteredVolunteerSigs ? filteredVolunteerSigs.length : 0;

    const rankedVolunteerSigs = useRankVolunteerSignatures(filteredVolunteerSigs);

    return (
        <SignatureListPaginator
            queryResultSize={queryResultSize}
            rankedSignatureData={rankedVolunteerSigs}
            listItemCreator={volunteerItemCreator}
        />
    );
};
