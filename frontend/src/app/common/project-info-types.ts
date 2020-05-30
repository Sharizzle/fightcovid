import { TFilterData } from '../components/filter/filter';

export const stageCategoryTagDisplayTextMap = new Map<string, string>([
    ['0idea', 'Just an idea'],
    ['1launch', 'Launching'],
    ['2growth', 'Growth stage'],
    ['3ebts', 'Established business'],
]);

export const stageFilterData: TFilterData = {
    title: 'Filter by stage:',
    tagSet: {
        category: 'stage',
        tags: ['0idea', '1launch', '2growth', '3ebts'],
    },
};

export const projectCategoryTagDisplayMap = new Map<string, string>([
    ['community', 'Community support'],
    ['couriers', 'Couriers and delivery'],
    ['education', 'Education'],
    ['entertainment', 'Entertainment'],
    ['financial', 'Financial services'],
    ['healthcare', 'Healthcare'],
    ['personal', 'Personal protective equipment'],
    ['remote working', 'Remote working'],
    ['retail', 'Retail'],
    ['social care', 'Social care'],
    ['fitness', 'Fitness'],
    ['transport', 'Transport'],
    ['mental health', 'Mental health'],
    ['monitoring', 'Monitoring the spread'],
    ['testing', 'Testing'],
    ['employ', 'Employment'],
    ['volunteer', 'Volunteer outreach'],
    ['news and info', 'News and information'],
    ['social', 'Social giving'],
    ['protecting', 'Protecting the vulnerable'],
    ['accommodation', 'Accommodation'],
    ['other', 'Other'],
    ['environment', 'Environment'],
    ['supply chain', 'Supply chains'],
    ['academic research', 'Academic research'],
]);
export const projectCategoryFilterData: TFilterData = {
    title: 'Filter by category:',
    tagSet: {
        category: 'category',
        tags: [
            'community',
            'couriers',
            'education',
            'entertainment',
            'financial',
            'healthcare',
            'personal',
            'remote working',
            'retail',
            'social care',
            'fitness',
            'transport',
            'mental health',
            'monitoring',
            'testing',
            'employ',
            'volunteer',
            'news and info',
            'social',
            'protecting',
            'accommodation',
            'other',
            'environment',
            'supply chain',
            'academic research',
        ]
            .concat()
            .sort(),
    },
};

export interface TProjectSig {
    id: string;
    createdBy: string;
    lookingForSkillsTagIDs: Array<string>;
    stage: string;
    categories: Array<string>;
}

export interface TProjectInfo {
    id: string;
    title: string;
    stage: string;
    shortDescription: string;
    description: string;
    contactInfo: string;
    lookingForSkillsTagIDs: Array<string>;
    location: string;
    createdBy: string;
    categories: Array<string>;
}
