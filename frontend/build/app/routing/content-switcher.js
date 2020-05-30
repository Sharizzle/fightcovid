import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppPage } from '../pages/page-component';
import { RedirectToHome } from './redirect-to-home-component';
import { HomeRoute, RouteMapping } from './route-mapping';
export const AppContentSwitcher = () => {
    const [currentPage, setCurrentPage] = useState(null);
    const location = useLocation();
    useEffect(() => {
        const locationUrl = location.pathname || 'unknown';
        if (location.pathname === '/') {
            setCurrentPage(HomeRoute);
            return;
        }
        const currentLocation = RouteMapping.find(item => locationUrl === item.url);
        if (!currentLocation) {
            setCurrentPage({
                id: 'redirect',
                title: HomeRoute.title,
                url: HomeRoute.url,
                page: React.createElement(RedirectToHome, null)
            });
            return;
        }
        if (currentLocation !== currentPage) {
            setCurrentPage(currentLocation);
        }
    }, [location, currentPage]);
    if (!currentPage || !currentPage.page) {
        return null;
    }
    return React.createElement(AppPage, null, currentPage.page);
};
//# sourceMappingURL=content-switcher.js.map