import Breadcrumb from 'antd/es/breadcrumb';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeRoute } from '../../routing/route-mapping';
import { TRouteMappingItem, getRouteItemByUrl } from '../../routing/route-mapping';

function calculateBreadCrumbs(pathname: string): Array<TRouteMappingItem> {
    if (pathname === HomeRoute.url) {
        return [];
    }

    const currentLocation = getRouteItemByUrl(pathname);
    if (!currentLocation) {
        // We will be re-routed to home very soon.
        return [];
    }

    // TODO: Fix after haste / this is a hack
    const parts = currentLocation.url
        .slice(0, 2)
        .split('/')
        .filter((item: string) => Boolean(item));
    parts.pop();

    const actualBreadcrumbs = [HomeRoute];

    let currentPath = '';
    parts.forEach((part) => {
        currentPath += '/' + part;
        const currentPart = getRouteItemByUrl(currentPath);
        if (currentPart) {
            actualBreadcrumbs.push(currentPart);
        }
    });

    actualBreadcrumbs.push(currentLocation);

    return actualBreadcrumbs;
}

export const AppBreadcrumbs: React.FC = () => {
    const { pathname } = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<Array<TRouteMappingItem>>([]);

    useEffect(() => {
        setBreadcrumbs(calculateBreadCrumbs(pathname));
    }, [pathname]);

    if (!breadcrumbs.length) {
        return null;
    }

    return (
        <Breadcrumb className="app-breadcrumbs">
            {breadcrumbs.map((item, idx) => {
                return (
                    <Breadcrumb.Item key={idx}>
                        <>
                            {item.isDynamicRoute && item.title}
                            {!item.isDynamicRoute && idx === breadcrumbs.length - 1 && item.title}
                            {!item.isDynamicRoute && idx < breadcrumbs.length - 1 && (
                                <Link to={item.url}>{item.title}</Link>
                            )}
                        </>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};
