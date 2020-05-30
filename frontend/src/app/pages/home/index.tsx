import React, { useContext } from 'react';

import { useVolunteerCount } from '../../hooks/volunteerDataHooks';

import { useProjectCount, useReadFeaturedProjects } from '../../hooks/projectDataHooks';
import { Link } from 'react-router-dom';
import {
    getUrlViaDynamicRouteAndParam,
    ListProjectsRoute,
    ListVolunteersRoute,
    SignUpRoute,
    SingleProjectRoute,
} from '../../routing/route-mapping';
import { Button, Typography } from 'antd';
import { TProjectInfo } from '../../common/project-info-types';
import { AppFooter } from '../../components/footer/footer-component';
import { useAuthUser } from '../../hooks/authHooks';
import { AnalyticsContext } from '../../app';

const { Paragraph } = Typography;

export const HomePage: React.FC = () => {
    const numberVolunteers = useVolunteerCount();
    const displayNumberVolunteers = numberVolunteers ? `${numberVolunteers}` : '...';
    const numberProjects = useProjectCount();
    const displayNumberProjects = numberProjects ? `${numberProjects}` : '...';
    const featuredProjects = useReadFeaturedProjects();

    const { initializing, authUser } = useAuthUser();
    const loggedIn = !initializing && !!authUser;

    const analytics = useContext(AnalyticsContext);

    const homepageClickViewProjectsAnalyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('view_projects_homepage_click');
        }
    };

    const homepageClickViewFeaturedProjectAnalyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('view_featured_project_homepage_click');
        }
    };

    const homepageClickViewVolunteersAnalyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('view_volunteers_homepage_click');
        }
    };

    const homepageClickSignUpToVolunteerAnalyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('homepage_sign_up_to_volunteer_click');
        }
    };

    return (
        <>
            <div className="home-page-container">
                <div className="intro">
                    <div className="intro-logo" />
                    <div className="intro-text">
                        <div className="headline-1">
                            We want to make sure that no UK initiatives tackling COVID-19 lack the support and expertise
                            they need to grow, develop and flourish.
                        </div>
                        <div className="sub-headline headline-3">
                            Whilst we are building this platform in response to the pandemic, we are not only focused on
                            supporting initiatives tackling COVID-19 directly; we also aim to help those who simply need
                            a hand and that might be experiencing problems for any reason related to COVID.{' '}
                        </div>
                    </div>
                </div>
                <div className="projects-and-volunteers">
                    <Link to={ListProjectsRoute.url}>
                        <div className="projects" onClick={homepageClickViewProjectsAnalyticsCallback}>
                            <div className="headline-2 type-name">Initiatives</div>
                            <div className="type-count">{displayNumberProjects}</div>
                            <div className="type-description">
                                Initiatives tackling COVID-19 directly or responding to the secondary impacts of
                                COVID-19
                            </div>
                            <Button ghost className="find-projects-volunteers-button">
                                Find initiatives
                            </Button>
                            <div className="type-icon" />
                        </div>
                    </Link>
                    <Link to={ListVolunteersRoute.url}>
                        <div className="volunteers" onClick={homepageClickViewProjectsAnalyticsCallback}>
                            <div className="headline-2 type-name">Volunteers</div>
                            <div className="type-count">{displayNumberVolunteers}</div>
                            <div className="type-description">
                                Volunteers willing to invest their time to tackle COVID-19 and the secondary impacts of
                                COVID-19.
                            </div>
                            <Button
                                ghost
                                className="find-projects-volunteers-button"
                                onClick={homepageClickViewVolunteersAnalyticsCallback}
                            >
                                Find volunteers
                            </Button>
                            <div className="type-icon" />
                        </div>
                    </Link>
                </div>
                <div className="recent-projects">
                    <div className="recent-projects-backdrop" />
                    <div className="headline-2">Recent Projects</div>
                    <div className="recent-projects-container">
                        {featuredProjects &&
                            featuredProjects.map((projectInfo: TProjectInfo) => {
                                return (
                                    <div key={projectInfo.id} className="recent-project-item">
                                        <div className="project-header-container">
                                            <div className="doughnut" />
                                            <div className="project-name headline-3">
                                                <div>{projectInfo.title}</div>
                                            </div>
                                        </div>
                                        <div className="project-description">
                                            <Paragraph ellipsis={{ rows: 4 }}>{projectInfo.shortDescription}</Paragraph>
                                        </div>
                                        <div className="simple-flex-row-nowrap">
                                            <Link
                                                to={getUrlViaDynamicRouteAndParam(SingleProjectRoute, projectInfo.id)}
                                            >
                                                <Button
                                                    className="read-more-button"
                                                    type="primary"
                                                    onClick={homepageClickViewFeaturedProjectAnalyticsCallback}
                                                >
                                                    Read more
                                                </Button>
                                            </Link>
                                            {loggedIn && (
                                                <Link to={SignUpRoute.url}>
                                                    <Button onClick={homepageClickSignUpToVolunteerAnalyticsCallback}>
                                                        Sign up to volunteer
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="about-fightcovid">
                    <div className="headline-2">
                        About <b>fightcovid.uk</b>
                    </div>
                    <div className="about-fightcovid-text-container">
                        <p>
                            We started this platform to accelerate the development and growth of initiatives tackling
                            COVID-19.
                        </p>
                        <p>
                            We’ve been awestruck by the number of people willing to volunteer their time and expertise
                            to help out in this crisis. From engineers sharing innovative designs for ventilators to
                            people offering to take part in new vaccine trials, we all want to do our bit to help.
                            However, we noticed that many initiatives lack the expertise and support they need to get
                            their idea off the ground. Usually, a quick call with an expert or professional can provide
                            the breakthrough that’s needed.
                        </p>
                        <p>
                            Fightcovid.uk is a platform where initiatives and organisations can find the expertise and
                            support they need from professionals volunteering their time. Our goal is to make sure that
                            no UK initiatives tackling COVID-19 are left behind, just because they lack the expertise or
                            support they need for their ideas to develop, grow and flourish.
                        </p>
                        <p>
                            We have lots of ideas for development, including directing initiatives to solve and support
                            specific problems.
                        </p>
                    </div>
                </div>
            </div>
            <div className="app-footer">
                <AppFooter />
            </div>
        </>
    );
};
