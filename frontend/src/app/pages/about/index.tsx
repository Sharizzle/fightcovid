import Typography from 'antd/es/typography';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUrlViaDynamicRouteAndParam, SingleProjectRoute, SingleVolunteerRoute } from '../../routing/route-mapping';
import { FeedbackLink, PrivacyPolicyLink } from '../../common/common-constants';

// TODO: Using inline styles here; this should probably be refactored.

const { Title, Text } = Typography;

export const About: React.FC = () => {
    const RonitLink = getUrlViaDynamicRouteAndParam(SingleVolunteerRoute, 'ghYxsJyB52Mf4nZ1UT79pDsrAuG3');
    const OllieLink = getUrlViaDynamicRouteAndParam(SingleVolunteerRoute, '8vuwsqK8zDXdlj7WqBAqVadWRjv2');
    const MarcelLink = getUrlViaDynamicRouteAndParam(SingleVolunteerRoute, 'cr0QmA8LldNNSldVNTYAG2GthUn2');
    const MetaProjectLink = getUrlViaDynamicRouteAndParam(SingleProjectRoute, 'VNoYKCgZsA7jgb6NWEU6');

    return (
        <div className="simple-flex-column-align-center-nowrap-upper">
            <Title level={2}>About</Title>
            <div className="about-container">
                <div>
                    <Title level={3}>Summary</Title>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <Text>
                        We started this platform to accelerate the development and growth of initiatives tackling
                        COVID-19.
                        <br />
                        <br />
                        We’ve been awestruck by the vast number of people willing to volunteer their time and expertise
                        to help out in this crisis. From engineers sharing innovative designs for ventilators to people
                        offering to take part in new vaccine trials, we all want to do our bit to help.
                        <br />
                        <br />
                        However, we noticed that many initiatives lack the expertise and support they need to get their
                        idea off the ground. Usually, a quick call with an expert or professional can provide the
                        breakthrough that’s needed.
                        <br />
                        <br />
                        Fightcovid.uk is a platform where initiatives and organisations can find the expertise and
                        support they need from professionals volunteering their time.
                        <br />
                        <br />
                        Our goal is to make sure that no UK initiatives tackling COVID-19 are left behind, just because
                        they lack the expertise or support they need for their ideas to develop, grow and flourish.
                        <br />
                        <br />
                        We have lots of ideas for development, including directing initiatives to solve and support
                        specific problems.
                    </Text>
                </div>
                <Title level={3}>Contact Us</Title>
                <div>
                    <Text>
                        For media enquiries please contact media@fightcovid.uk or reach out directly to{' '}
                        <Link to={RonitLink}>Ronit</Link> or <Link to={OllieLink}>Ollie</Link>.
                    </Text>
                </div>
                <Title level={3}>Feedback</Title>
                <div>
                    <Text>
                        We are extremely new so feedback would be greatly appreciated! If you have any suggestions,
                        please reach out to feedback@fightcovid.uk. You could also fill in the following{' '}
                        <a href={FeedbackLink}>Google form</a>.
                    </Text>
                </div>
                <Title level={3}>Team</Title>
                <Text style={{ marginBottom: '12px' }}>
                    Massive thanks to <Link to={MarcelLink}>Marcel Mueller</Link> for the designs. If you want to get
                    involved, please reach out! We have a project listed <Link to={MetaProjectLink}>here</Link>. There
                    is a ton of stuff we want to add.
                </Text>
                <Title level={3}>Privacy policy</Title>
                <div>
                    <Text>
                        You can see our privacy policy{' '}
                        <a target="_blank " href={PrivacyPolicyLink}>
                            here
                        </a>
                        .
                    </Text>
                </div>
                <Title level={3}>Mandatory disclaimer</Title>
                <div>
                    <Text style={{ fontSize: '14px' }}>
                        Fight COVID is a platform which helps to co-ordinate expertise and support with initiatives
                        tackling the corona pandemic. Volunteers and projects on the platform are not directly
                        affiliated with Fight Covid UK (Action Ventures Limited) and we are not accountable for their
                        activities and actions. Requests and offers are not verified; please use your own judgment and
                        stay safe! Use at your own risk. Among other things, this website may contain information about
                        medical conditions and treatments. The information is not advice and should not be treated as
                        such. We bear no responsibility for any decisions or actions taken resulting from information
                        found on here. For up-to-date medical advice you should continue to check the NHS Website and
                        for corona-virus updates check the GOV.UK website. Please ensure that you adhere to government
                        guidelines. We bear no responsibility for any decisions or actions taken resulting from
                        information found on here.
                    </Text>
                </div>
            </div>
        </div>
    );
};
