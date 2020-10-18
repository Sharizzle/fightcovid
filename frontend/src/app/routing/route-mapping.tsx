import React from 'react';
import { Volunteers } from '../pages/volunteers';
import { HomePage } from '../pages/home';
import { About } from '../pages/about';
import { Projects } from '../pages/projects';
import { SingleProject } from '../pages/single-project';
import { SignUpPage } from '../pages/sign-up';
import { LoginPage } from '../pages/login';
import { MyProfilePage } from '../pages/my-profile';
import { MyProjectsPage } from '../pages/my-projects';
import { CreateProjectPage } from '../pages/create-project';
import { SingleUser } from '../pages/single-user';
import { EditProjectPage } from '../pages/edit-project';

export type TRouteMappingItem = {
    id: string;
    title: string;
    icon?: string;
    url: string;
    isHome?: boolean;
    page?: React.ReactElement;
    isMenuItem?: boolean;
    isMenuButtonItem?: boolean;
    isDynamicRoute?: boolean;
    isAuthEnabled?: boolean;
};

export const HomeRoute: TRouteMappingItem = {
    id: 'home',
    title: 'CSRN',
    url: '/',
    isHome: true,
    page: <HomePage />,
    isMenuItem: true,
};

export const LoginRoute: TRouteMappingItem = {
    id: 'login',
    title: 'Login',
    url: '/login',
    page: <LoginPage />,
    isMenuItem: true,
    isMenuButtonItem: true,
};

export const SignUpRoute: TRouteMappingItem = {
    id: 'sign-up',
    title: 'Sign up!',
    url: '/sign-up',
    page: <SignUpPage />,
    isMenuItem: true,
    isMenuButtonItem: true,
};

export const MyProfileRoute: TRouteMappingItem = {
    id: 'profile',
    title: 'My profile',
    url: '/my-profile',
    page: <MyProfilePage />,
    icon: 'user',
    isMenuItem: true,
    isMenuButtonItem: false,
    isAuthEnabled: true,
};

export const MyProjectsRoute: TRouteMappingItem = {
    id: 'my-projects',
    title: 'My projects',
    url: '/my-projects',
    page: <MyProjectsPage />,
    isMenuItem: true,
    isMenuButtonItem: false,
    isAuthEnabled: true,
};

export const CreateProjectsRoute: TRouteMappingItem = {
    id: 'create',
    title: 'Create a project',
    url: '/create-project',
    page: <CreateProjectPage />,
    isMenuItem: false,
    isMenuButtonItem: true,
    isAuthEnabled: true,
};

export const EditProjectsRoute: TRouteMappingItem = {
    id: 'edit',
    title: 'Edit a project',
    url: '/projects/edit/:id',
    page: <EditProjectPage />,
    isMenuItem: false,
    isDynamicRoute: true,
    isAuthEnabled: true,
};

export const ListProjectsRoute: TRouteMappingItem = {
    id: 'projects',
    title: 'Find Initiatives',
    url: '/projects',
    page: <Projects />,
    isMenuItem: true,
};

export const ListVolunteersRoute: TRouteMappingItem = {
    id: 'volunteers',
    title: 'Find Volunteers',
    url: '/volunteers',
    page: <Volunteers />,
    isMenuItem: true,
};

export const AboutRoute: TRouteMappingItem = {
    id: 'about',
    title: 'About CSRN',
    url: '/about',
    page: <About />,
    isMenuItem: true,
};

export const SingleProjectRoute: TRouteMappingItem = {
    id: 'single-single-project',
    title: 'Project',
    url: '/projects/:id',
    page: <SingleProject />,
    isMenuItem: false,
    isDynamicRoute: true,
};

export const SingleVolunteerRoute = {
    id: 'single-volunteer',
    title: 'Volunteer',
    url: '/volunteers/:id',
    page: <SingleUser />,
    isMenuItem: false,
    isDynamicRoute: true,
};

// main app routing
export const RouteMapping: Array<TRouteMappingItem> = [
    HomeRoute,
    LoginRoute,
    SignUpRoute,
    MyProjectsRoute,
    CreateProjectsRoute,
    EditProjectsRoute,
    ListProjectsRoute,
    ListVolunteersRoute,
    MyProfileRoute,
    AboutRoute,
    SingleProjectRoute,
    SingleVolunteerRoute,
];

function checkDynamicRouteHasParameterValue(url: string): boolean {
    const urlParts = url.split('/');
    if (urlParts.length < 3) {
        return false;
    }
    return urlParts[urlParts.length - 1] !== '';
}

export function findParameterValueFromDynamicUrl(url: string): string | undefined {
    if (!checkDynamicRouteHasParameterValue(url)) {
        return undefined;
    }
    return url.slice(url.lastIndexOf('/') + 1);
}

export function getDynamicRouteMinusParameter(url: string): string | undefined {
    if (!checkDynamicRouteHasParameterValue(url)) {
        return undefined;
    }
    return url.slice(0, url.lastIndexOf('/'));
}

export function getUrlViaDynamicRouteAndParam(item: TRouteMappingItem, param: string | undefined): string {
    if (!param) {
        return '/'; // Just route to homepage for now vcx
    }
    const routePrefix = getDynamicRouteMinusParameter(item.url);
    return routePrefix + '/' + param;
}

export function getRouteItemByUrl(url: string): TRouteMappingItem | undefined {
    const urlRouteMinusParam = getDynamicRouteMinusParameter(url);
    return RouteMapping.find((item: TRouteMappingItem) => {
        if (item.isDynamicRoute) {
            const itemUrlMinusParam = getDynamicRouteMinusParameter(item.url);
            if (urlRouteMinusParam === itemUrlMinusParam) {
                return item;
            }
        } else {
            if (url === item.url) {
                return item;
            }
        }
    });
}
