import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppPage } from '../pages/page-component';
import { RedirectToHome } from './redirect-to-home-component';
import { HomeRoute, getRouteItemByUrl, TRouteMappingItem } from './route-mapping';
import { useRouteScoot } from '../hooks/routeHooks';

export const AppContentSwitcher: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<TRouteMappingItem | null>(null);
    const { pathname } = useLocation();

    // Scroll to top on change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    useRouteScoot();

    useEffect(() => {
        if (pathname === '/') {
            setCurrentPage(HomeRoute);
            return;
        }
        const currentLocation = getRouteItemByUrl(pathname);
        if (!currentLocation) {
            setCurrentPage({
                id: 'redirect',
                title: HomeRoute.title,
                url: HomeRoute.url,
                page: <RedirectToHome />,
            });
            return;
        }

        if (currentLocation.isDynamicRoute || currentLocation !== currentPage) {
            setCurrentPage(currentLocation);
        }
    }, [pathname, currentPage]);

    if (!currentPage || !currentPage.page) {
        return null;
    }

    if (currentPage === HomeRoute) {
        return <>{currentPage.page}</>;
    }

    return <AppPage>{currentPage.page}</AppPage>;
};
