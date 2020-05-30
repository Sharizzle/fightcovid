import { TFilterData } from '../components/filter/filter';

export const skillsCategoryTagDisplayTextMap = new Map<string, string>([
    ['accounting', 'Accounting'],
    ['app development', 'App development'],
    ['business development', 'Business development'],
    ['content', 'Content'],
    ['data entry', 'Data entry'],
    ['design', 'Design'],
    ['teaching', 'Teaching'],
    ['funding', 'Funding'],
    ['legal', 'Legal'],
    ['manufacturing', 'Manufacturing'],
    ['marketing', 'Marketing'],
    ['medicine', 'Medicine'],
    ['product/project', 'Product/Project management'],
    ['strategy', 'Strategy'],
    ['socialm', 'Social media'],
    ['website', 'Website development'],
    ['logistics', 'Logistics and distribution'],
    ['local volunteer', 'Local volunteer outreach'],
    ['people skills', 'People skills'],
    ['ux/ui', 'UX/UI'],
    ['mechanical', 'Mechanical engineering'],
    ['electrical', 'Electrical engineering'],
    ['foreign', 'Foreign languages'],
    ['sales', 'Sales'],
    ['social work', 'Social work expertise'],
    ['counselling', 'Counselling'],
    ['helping', 'Helping hand'],
    ['partnerships', 'Partnerships'],
    ['research', 'Research'],
    ['data analysis', 'Data analysis'],
    ['market research', 'Market Research'],
    ['ideas', 'Ideas'],
    ['communication', 'Communication'],
]);

export const skillsFilterData: TFilterData = {
    title: 'Filter by specific skills:',
    tagSet: {
        category: 'skills',
        tags: [
            'accounting',
            'app development',
            'business development',
            'content',
            'data entry',
            'design',
            'teaching',
            'funding',
            'legal',
            'manufacturing',
            'marketing',
            'medicine',
            'product/project',
            'strategy',
            'socialm',
            'website',
            'logistics',
            'local volunteer',
            'people skills',
            'ux/ui',
            'mechanical',
            'electrical',
            'foreign',
            'sales',
            'social work',
            'counselling',
            'helping',
            'partnerships',
            'research',
            'market research',
            'ideas',
            'communication',
            'data analysis',
        ]
            .concat()
            .sort(),
    },
};
