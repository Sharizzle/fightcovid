import Icon from 'antd/es/icon';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    RouteMapping,
    TRouteMappingItem,
    LoginRoute,
    SignUpRoute,
    MyProfileRoute,
    MyProjectsRoute,
    HomeRoute,
    CreateProjectsRoute,
} from '../../routing/route-mapping';
import { Button } from 'antd';
import { useAuthUser, useSignOut } from '../../hooks/authHooks';
import { useUserDefinitelyNeedsInit } from '../../hooks/currentUserHooks';
import { AnalyticsContext } from '../../app';

const menuItems = RouteMapping.filter((item: TRouteMappingItem) => item.isMenuItem);
const linkMenuItems = menuItems.filter((item: TRouteMappingItem) => !item.isMenuButtonItem && !item.isAuthEnabled);
const rightMenuItems = linkMenuItems.filter((item: TRouteMappingItem) => !item.isHome);

function findActiveMenuID(locationUrl: string): string | undefined {
    // locationUrl example: "/path"
    const urlParts = locationUrl.split('/');
    if (urlParts.length == 0) {
        return undefined;
    }
    return menuItems.find((item: TRouteMappingItem) => item.url === '/' + urlParts[1])?.id;
}

function useActiveMenuKey(): string {
    const { pathname } = useLocation();
    const [activeItemKey, setActiveItemKey] = useState('');

    useEffect(() => {
        const attemptKeyFind = findActiveMenuID(pathname);
        if (attemptKeyFind !== undefined) {
            setActiveItemKey(attemptKeyFind);
        } else {
            setActiveItemKey('');
        }
    }, [pathname]);

    return activeItemKey;
}

const MenuHomeLinkItem: React.FC<{ mobile?: boolean; disabled?: boolean }> = (props: {
    mobile?: boolean;
    disabled?: boolean;
}) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsCallback: () => void = () => {
        if (analytics) {
            const options = {
                menuId: HomeRoute.id,
                location: pathname,
            };
            if (props.mobile) {
                analytics.logEvent('mobile_menu_item_clicked', options);
            } else {
                analytics.logEvent('desktop_menu_item_clicked', options);
            }
        }
    };

    const linkDisabledStyling = props.disabled ? 'cursor-disabled' : '';
    return (
        <Link className={linkDisabledStyling} to={HomeRoute.url}>
            <div className="home-menu-item-container" onClick={analyticsCallback}>
                <div className="home-logo-container" />
                <div className="app-main-menu-item">
                    <span>{HomeRoute.title}</span>
                </div>
            </div>
        </Link>
    );
};

const DesktopMenuLinkItem: React.FC<{ item: TRouteMappingItem; disabled?: boolean }> = (props: {
    item: TRouteMappingItem;
    disabled?: boolean;
}) => {
    const { item } = props;
    const activeMenuId = useActiveMenuKey();
    const activeMenuStyling = activeMenuId === item.id ? 'app-main-menu-item-selected' : 'app-main-menu-item-hoverable';
    const linkDisabledStyling = props.disabled ? 'cursor-disabled' : '';

    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_item_clicked', {
                menuId: item.id,
                location: pathname,
            });
        }
    };

    return (
        <div className={activeMenuStyling} key={item.id} onClick={analyticsCallback}>
            <Link className={linkDisabledStyling} to={item.url}>
                {item.title}
            </Link>
        </div>
    );
};

const MobileMenuLinkItem: React.FC<{ item: TRouteMappingItem }> = (props: { item: TRouteMappingItem }) => {
    const { item } = props;
    const activeMenuId = useActiveMenuKey();
    const showOrHideStripeStyle = activeMenuId === item.id ? 'stripe-show' : 'stripe-hidden';

    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_item_clicked', {
                menuId: item.id,
                location: pathname,
            });
        }
    };

    return (
        <Link to={item.url} key={item.id}>
            <div className="app-mobile-menu-row-hover-container" onClick={analyticsCallback}>
                <div className="app-mobile-menu-row">
                    <div className={showOrHideStripeStyle} />
                    <div className="row-text">{item.title}</div>
                </div>
            </div>
        </Link>
    );
};

const MobileSignOutLink: React.FC<{ signOutCallback: () => void }> = (props: { signOutCallback: () => void }) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsWrappedCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('mobile_menu_sign_out_clicked', {
                location: pathname,
            });
        }
        props.signOutCallback();
    };

    return (
        <div className="app-mobile-menu-row-hover-container" onClick={analyticsWrappedCallback}>
            <div className="app-mobile-menu-row">
                <div className="stripe-hidden" />
                <div className="row-text">Sign out</div>
            </div>
        </div>
    );
};

const DesktopLoginSignUpButtons: React.FC = () => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsSignUpCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_sign_up_clicked', {
                location: pathname,
            });
        }
    };

    const analyticsLogInCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_login_clicked', {
                location: pathname,
            });
        }
    };

    return (
        <div className="app-main-menu-login-sign-up-container">
            <Link to={SignUpRoute.url} key={SignUpRoute.id}>
                <Button className="app-main-menu-login-sign-up-button" type="primary" onClick={analyticsSignUpCallback}>
                    Sign up
                </Button>
            </Link>
            <Link to={LoginRoute.url} key={LoginRoute.id}>
                <Button className="app-main-menu-login-sign-up-button" onClick={analyticsLogInCallback}>
                    Login
                </Button>
            </Link>
        </div>
    );
};

const DesktopSignOutButton: React.FC<{ signOut: () => Promise<void> }> = (props: { signOut: () => Promise<void> }) => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsWrappedCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_sign_out_clicked', {
                location: pathname,
            });
        }
        props.signOut();
    };

    return (
        <div className="app-main-menu-desktop-sign-out-button">
            <Button className="app-main-menu-login-sign-up-button" onClick={analyticsWrappedCallback}>
                Sign out
            </Button>
        </div>
    );
};

const DesktopCreateProjectButton: React.FC = () => {
    const analytics = useContext(AnalyticsContext);
    const { pathname } = useLocation();

    const analyticsCallback: () => void = () => {
        if (analytics) {
            analytics.logEvent('desktop_menu_create_project_clicked', {
                menuId: SignUpRoute.id,
                location: pathname,
            });
        }
    };

    return (
        <Link to={CreateProjectsRoute.url} key={CreateProjectsRoute.id}>
            <Button className="app-main-menu-desktop-create-project-button" type="primary" onClick={analyticsCallback}>
                Create a project
            </Button>
        </Link>
    );
};

export const AppMainMenu: React.FC = () => {
    const userNeedsInit = useUserDefinitelyNeedsInit();
    const { initializing, authUser } = useAuthUser();

    const loggedOut = !initializing && !authUser;
    const loggedIn = !initializing && !!authUser;
    const signOut = useSignOut();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setMobileMenuOpen(!mobileMenuOpen);
    }, [mobileMenuOpen]);

    const openCloseIcon = mobileMenuOpen ? (
        <Icon onClick={toggleOpen} type="minus" className="app-fold-unfold-button" />
    ) : (
        <Icon onClick={toggleOpen} type="menu-unfold" className="app-fold-unfold-button" />
    );

    return (
        <div className="app-main-menu-container">
            <div className="app-main-menu-desktop-container">
                <MenuHomeLinkItem />
                <div className="flex-grow-box" />
                {rightMenuItems.map((item: TRouteMappingItem) => (
                    <DesktopMenuLinkItem key={item.id} item={item} disabled={userNeedsInit} />
                ))}
                {loggedIn && <DesktopMenuLinkItem item={MyProjectsRoute} />}
                {loggedIn && <DesktopMenuLinkItem key={MyProfileRoute.id} item={MyProfileRoute} />}
                {loggedIn && <DesktopCreateProjectButton />}
                {loggedIn && <DesktopSignOutButton signOut={signOut} />}
                {loggedOut && <DesktopLoginSignUpButtons />}
            </div>

            <div className="app-main-menu-mobile-container">
                <div className="app-mobile-menu-header-container" onClick={toggleOpen}>
                    <MenuHomeLinkItem mobile />
                    <div className="box">{openCloseIcon}</div>
                </div>

                <div className={mobileMenuOpen ? '' : 'display-none'} onClick={toggleOpen}>
                    <>
                        {!userNeedsInit &&
                            rightMenuItems.map((item: TRouteMappingItem) => (
                                <MobileMenuLinkItem key={item.id} item={item} />
                            ))}
                    </>
                    {!userNeedsInit && loggedOut && <MobileMenuLinkItem item={SignUpRoute} />}
                    {!userNeedsInit && loggedOut && <MobileMenuLinkItem item={LoginRoute} />}
                    {!userNeedsInit && loggedIn && <MobileMenuLinkItem item={MyProfileRoute} />}
                    {!userNeedsInit && loggedIn && <MobileMenuLinkItem item={MyProjectsRoute} />}
                    {loggedIn && <MobileSignOutLink signOutCallback={signOut} />}
                </div>
            </div>
        </div>
    );
};
