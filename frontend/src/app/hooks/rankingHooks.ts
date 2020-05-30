import { useReadCurrentUserInfo } from './currentUserHooks';
import { TProjectSig } from '../common/project-info-types';
import { intersectArrays } from '../common/utils';
import { TUserSig } from '../common/volunteer-into-types';

// Add some metadata to the project signatures so that we can rank them etc...

export type TProjectRankAugmentedSignature = {
    meta: {
        matchesSkills: boolean;
        isCurrentUsersProject: boolean;
    };
    score: number;
    signature: TProjectSig;
};

export const useRankProjectSignatures: (
    projectSigs?: Array<TProjectSig>,
) => undefined | Array<TProjectRankAugmentedSignature> = (projectSigs?: Array<TProjectSig>) => {
    const currentUserInfo = useReadCurrentUserInfo();
    const currentUserSkillsIDs = currentUserInfo?.skillsTagIDs;

    if (!projectSigs) {
        return undefined;
    }

    if (!currentUserSkillsIDs) {
        return projectSigs.map((sig: TProjectSig) => {
            return {
                meta: {
                    matchesSkills: false,
                },
                score: 0,
                signature: sig,
            } as TProjectRankAugmentedSignature;
        });
    }

    const augmentedSigs: Array<TProjectRankAugmentedSignature> = projectSigs.map((sig: TProjectSig) => {
        const skillIntersectCount: number = intersectArrays(sig.lookingForSkillsTagIDs, currentUserSkillsIDs).length;
        return {
            meta: {
                matchesSkills: skillIntersectCount > 0,
                isCurrentUsersProject: sig.createdBy === currentUserInfo?.id,
            },
            score: skillIntersectCount,
            signature: sig,
        } as TProjectRankAugmentedSignature;
    });

    return augmentedSigs.sort((a: TProjectRankAugmentedSignature, b: TProjectRankAugmentedSignature) => {
        return b.score - a.score;
    });
};

export type TVolunteerRankAugmentedSignature = {
    meta: {};
    score: number;
    signature: TUserSig;
};

// TODO: NOT ranking volunteers (yet). Could volunteer by hours available.
export const useRankVolunteerSignatures: (
    userSigs?: Array<TUserSig>,
) => undefined | Array<TVolunteerRankAugmentedSignature> = (projectSigs?: Array<TUserSig>) => {
    if (!projectSigs) {
        return undefined;
    }

    return projectSigs.map((sig: TUserSig) => {
        return {
            meta: {},
            score: 0,
            signature: sig,
        } as TVolunteerRankAugmentedSignature;
    });
};
