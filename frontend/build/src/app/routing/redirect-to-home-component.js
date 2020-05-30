import React from 'react';
import { Redirect } from 'react-router-dom';
import { RouteMapping } from './route-mapping';
const homeRoute = RouteMapping.find(item => item.isHome);
if (!homeRoute) {
    throw new Error('No home route declared!');
}
export const RedirectToHome = () => {
    return React.createElement(Redirect, { to: homeRoute.url });
};
//# sourceMappingURL=redirect-to-home-component.js.map