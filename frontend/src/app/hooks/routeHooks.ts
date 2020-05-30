import { useAuthUser } from './authHooks';
import { useLocation } from 'react-router';
import { useRedirect } from './useRedirect';
import { useContext, useLayoutEffect } from 'react';
import {
    CreateProjectsRoute,
    ListProjectsRoute,
    LoginRoute,
    MyProfileRoute,
    SignUpRoute,
} from '../routing/route-mapping';
import { useReadCurrentUserInfo } from './currentUserHooks';
import { AnalyticsContext } from '../app';

// TODO: Maybe think about how this could be refactored.

export const useRouteScoot: () => void = () => {
    const { authUser, initializing } = useAuthUser();
    const userInfo = useReadCurrentUserInfo();
    const { pathname } = useLocation();
    const redirect = useRedirect();

    const analytics = useContext(AnalyticsContext);

    useLayoutEffect(() => {
        // You definitely aren't logged in, but go to profile or projects
        if (!initializing && !authUser && [MyProfileRoute.url, CreateProjectsRoute.url].includes(pathname)) {
            redirect(LoginRoute.url);
            if (analytics) {
                analytics.logEvent('redirected_to_login');
            }
        }

        // You definitely are logged in, with data and initialised, but go to sign up or login.
        if (
            !initializing &&
            !!authUser &&
            !!userInfo &&
            userInfo.userIsDefined &&
            [LoginRoute.url, SignUpRoute.url].includes(pathname)
        ) {
            redirect(ListProjectsRoute.url);
            if (analytics) {
                analytics.logEvent('redirected_to_projects');
            }
        }

        // You are definitely logged in, with data but not initialised, we need to route you to the profile.
        if (!initializing && !!authUser && !!userInfo && !userInfo.userIsDefined) {
            redirect(MyProfileRoute.url);
            if (analytics) {
                analytics.logEvent('redirected_to_my_profile');
            }
        }
    }, [initializing, authUser, pathname, userInfo]);
};
