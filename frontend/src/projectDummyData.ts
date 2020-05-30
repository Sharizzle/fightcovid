import { TProjectInfo } from './app/common/project-info-types';
import { TUserInfo } from './app/common/volunteer-into-types';

const d1text: string =
    'We have started collecting data sets around the corona virus: case numbers, hospital equipment, 311 services center info, research papers and more.\n' +
    '\n' +
    'Help us build APIs and make them available for researchers and developers to quickly get scalable access to the data.\n' +
    '\n' +
    'Check out https://www.xapix.io/covid-19-initiative as a starting point to play around with APIs. More infos on current planning below.\n' +
    '\n' +
    'Check out https://www.xapix.io/covid-19-initiative as a starting point to play around with APIs. More infos on current planning below.\n';

const proj1: TProjectInfo = {
    id: '30',
    title: 'Build APIs around Corona Solutions',
    description: d1text,
    stage: '3ebts',
    lookingForSkillsTagIDs: ['Software Developer', 'Designer', 'Project Manager'],
    location: 'UK',
    createdDate: '18 days ago',
};

const syntheticData = [] as Array<TProjectInfo>;
for (let i = 0; i < 10; i++) {
    const x = JSON.parse(JSON.stringify(proj1));
    x.id = x.id + i.toString();
    console.log(x);
    syntheticData.push(x);
}

const dummyProjects = syntheticData;

const desc4 =
    'I am a UX Designer working at Cognizant, India. I love cooking, designing, photopraphy, football & poems.\n' +
    '\n' +
    'Core skillset: UX Design and UI Design\n' +
    'I have basic idea on coding only required for design but do not count me in for coding. I will happily volunteer in such harsh times.';

const dummyVolunteer: TUserInfo = {
    id: '40',
    name: 'Srayan Goswami',
    email: 'srayan90@gmail.com',
    skillsTagIDs: ['software', 'content'],
    description: desc4,
    availabilityCategoryTagID: 'volunteering',
    hoursPerWeekPercent: '2',
    location: 'London',
};

export const syntheticDataV = [] as Array<TUserInfo>;
for (let i = 0; i < 10; i++) {
    const x = JSON.parse(JSON.stringify(dummyVolunteer));
    x.id = x.id + i.toString();
    syntheticDataV.push(x);
}

export default dummyProjects;
