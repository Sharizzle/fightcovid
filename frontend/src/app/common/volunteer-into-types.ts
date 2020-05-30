import { TFilterData } from '../components/filter/filter';

// TODO: Availability unused (for now).
export const availabilityTagDisplayTextMap = new Map<string, string>([
    ['available', 'Available'],
    ['unavailable', 'Unavailable'],
    ['volunteering', 'Currently volunteering!'],
]);

export const availabilityFilterData: TFilterData = {
    title: 'Filter by volunteer availability: ',
    tagSet: {
        category: 'availability',
        tags: ['available', 'unavailable', 'volunteering'].concat().sort(),
    },
};

export interface TUserSig {
    id: string;
    skillsTagIDs: Array<string>;
    hoursPerWeekPercent: number;
    listUser: boolean;
}

export interface TUserInfo {
    id: string;
    name: string;
    email: string;
    description: string;
    skillsTagIDs: Array<string>;
    contactLinks: string;
    hoursPerWeekPercent: number;
    location: string;
    userIsDefined: boolean;
    listUser: boolean;
}
