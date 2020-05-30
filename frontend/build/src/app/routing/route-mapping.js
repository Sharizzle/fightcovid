import React from 'react';
import { AboutPage } from '../pages/about';
import { AuthorPage } from '../pages/about/author';
import { AuthorSubPage } from '../pages/about/author/sub-page';
import { DataPage } from '../pages/data';
import { HomePage } from '../pages/home';
import { SettingsPage } from '../pages/settings';
import { UserPage } from '../pages/user';
import { prepareItems } from './route-mapping-utils';
export const RouteMapping = prepareItems([
    { id: 'home', title: 'Home', url: '/home', isHome: true, page: React.createElement(HomePage, null) },
    { id: 'data', title: 'Data', url: '/data', page: React.createElement(DataPage, null) },
    { id: 'about', title: 'About', url: '/about', page: React.createElement(AboutPage, null) },
    { id: 'author', title: 'Author', url: '/about/author', page: React.createElement(AuthorPage, null) },
    { id: 'author-sub', title: 'Author sub-page', url: '/about/author/sub-page', page: React.createElement(AuthorSubPage, null) },
    { id: 'settings', title: 'Settings', url: '/settings', page: React.createElement(SettingsPage, null), isRightMenu: true, icon: 'setting' },
    { id: 'user', title: 'User', url: '/my-profile', page: React.createElement(UserPage, null), isRightMenu: true, icon: 'user' },
]);
export const HomeRoute = RouteMapping.find(item => item.isHome);
if (!HomeRoute) {
    throw new Error('No home route declared!');
}
//# sourceMappingURL=route-mapping.js.map
