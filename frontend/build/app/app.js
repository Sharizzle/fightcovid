import Affix from 'antd/es/affix';
import Layout from 'antd/es/layout';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppBreadcrumbsWrapper } from './components/breadcrumbs/breadcrumbs-component-wrapper';
import { AppFooter } from './components/footer/footer-component';
import { AppMainMenu } from './components/main-menu/main-menu-component';
import { AppContentSwitcher } from './routing/content-switcher';
const { Header, Footer, Content } = Layout;
export const App = () => {
    return React.createElement("div", { className: 'app-container' },
        React.createElement(Router, null,
            React.createElement(Layout, { className: 'app-layout' },
                React.createElement(Header, { className: 'app-menu' },
                    React.createElement(AppMainMenu, null)),
                React.createElement(Content, { className: 'app-content' },
                    React.createElement(Affix, { className: 'app-menu-affix' },
                        React.createElement(AppBreadcrumbsWrapper, null)),
                    React.createElement(AppContentSwitcher, null)),
                React.createElement(Footer, { className: 'app-footer' },
                    React.createElement(AppFooter, null)))));
};
//# sourceMappingURL=app.js.map