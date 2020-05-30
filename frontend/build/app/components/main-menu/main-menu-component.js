import Icon from 'antd/es/icon';
import Menu from 'antd/es/menu';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RouteMapping } from '../../routing/route-mapping';
import { getRouteByUrl } from '../../routing/route-mapping-utils';
function createMenuItem(item) {
    return React.createElement(Menu.Item, { key: item.url, className: 'app-menu-item' },
        React.createElement(Link, { to: item.url },
            item.icon && React.createElement(Icon, { type: item.icon }),
            item.title));
}
function calculateMenuParts(locationUrl) {
    const parts = locationUrl.split('/').filter(item => Boolean(item));
    const firstLevelActiveItem = getRouteByUrl(parts.length ? '/' + parts[0] : '');
    const firstLevelActiveUrl = (firstLevelActiveItem === null || firstLevelActiveItem === void 0 ? void 0 : firstLevelActiveItem.url) || '';
    const leftMenu = RouteMapping
        .filter(item => item.isRightMenu !== true)
        .filter(item => item.isSecondary !== true)
        .map(item => (Object.assign(Object.assign({}, item), { isActive: item.url === firstLevelActiveUrl })));
    const rightMenu = RouteMapping
        .filter(item => item.isRightMenu === true)
        .filter(item => item.isSecondary !== true)
        .map(item => (Object.assign(Object.assign({}, item), { isActive: item.url === firstLevelActiveUrl })));
    return [leftMenu, rightMenu, firstLevelActiveUrl];
}
export const AppMainMenu = () => {
    const location = useLocation();
    const [leftMenuItems, setLeftMenuItems] = useState([]);
    const [rightMenuItems, setRightMenuItems] = useState([]);
    const [activeItemKey, setActiveItemKey] = useState('');
    useEffect(() => {
        const locationUrl = location.pathname || 'unknown';
        const [leftMenu, rightMenu, activeKey] = calculateMenuParts(locationUrl);
        setLeftMenuItems(leftMenu);
        setRightMenuItems(rightMenu);
        setActiveItemKey(activeKey);
    }, [location]);
    return React.createElement("div", { className: 'app-main-menu-container' },
        React.createElement(Menu, { className: 'app-main-menu', theme: "dark", mode: "horizontal", selectedKeys: [activeItemKey] },
            leftMenuItems.map(createMenuItem),
            React.createElement(Menu.Item, { key: 'menu-stub', className: 'app-menu-stub', disabled: true }),
            rightMenuItems.map(createMenuItem)));
};
//# sourceMappingURL=main-menu-component.js.map