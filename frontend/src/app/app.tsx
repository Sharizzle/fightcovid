import Layout from 'antd/es/layout';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppBreadcrumbsWrapper } from './components/breadcrumbs/breadcrumbs-component-wrapper';
import { AppMainMenu } from './components/main-menu/main-menu-component';
import { AppContentSwitcher } from './routing/content-switcher';

import { firebaseConfig } from '../../config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

import { useListenToCurrentUserInfoForContext } from './hooks/currentUserHooks';
import { TUserInfo, TUserSig } from './common/volunteer-into-types';
import { useReadVolunteerSignaturesForContext } from './hooks/volunteerDataHooks';
import { TProjectSig } from './common/project-info-types';
import { AuthState, useAuthForContext } from './hooks/authHooks';
import { useReadProjectSignaturesForContext } from './hooks/projectDataHooks';

const firebaseApp: firebase.app.App = firebase.initializeApp(firebaseConfig);
const firebaseStore: firebase.firestore.Firestore = firebaseApp.firestore();
const firebaseAnalytics: firebase.analytics.Analytics = firebase.analytics();

const { Content } = Layout;

// TODO: Using this custom hook-based state management for now. Might be
// necessary to switch to redux or redux-hooks.

// TODO: Some of these DON'T need to start and should be refactored.
export const AuthHookContext = React.createContext(undefined as undefined | AuthState);
export const CurrentUserInfoContext = React.createContext(undefined as undefined | TUserInfo);
export const FirestoreContext = React.createContext(undefined as undefined | firebase.firestore.Firestore);
export const ProjectSignatureContext = React.createContext(undefined as undefined | Array<TProjectSig>);
export const VolunteerSignatureContext = React.createContext(undefined as undefined | Array<TUserSig>);
export const AnalyticsContext = React.createContext(undefined as undefined | firebase.analytics.Analytics);

const FirebaseWrappedApp: React.FC = () => {
    const currentUserInfo = useListenToCurrentUserInfoForContext();
    const projectSigs = useReadProjectSignaturesForContext();
    const volSigs = useReadVolunteerSignaturesForContext();

    return (
        <CurrentUserInfoContext.Provider value={currentUserInfo}>
            <ProjectSignatureContext.Provider value={projectSigs}>
                <VolunteerSignatureContext.Provider value={volSigs}>
                    <div className="app-container">
                        <Router>
                            <Layout className="app-layout">
                                <div className="app-menu">
                                    <AppMainMenu />
                                </div>
                                <Content className="app-content">
                                    <AppBreadcrumbsWrapper />
                                    <AppContentSwitcher />
                                </Content>
                            </Layout>
                        </Router>
                    </div>
                </VolunteerSignatureContext.Provider>
            </ProjectSignatureContext.Provider>
        </CurrentUserInfoContext.Provider>
    );
};

const App: React.FC = () => {
    const currentAuthInfo = useAuthForContext();
    return (
        <FirestoreContext.Provider value={firebaseStore}>
            <AuthHookContext.Provider value={currentAuthInfo}>
                <AnalyticsContext.Provider value={firebaseAnalytics}>
                    <FirebaseWrappedApp />
                </AnalyticsContext.Provider>
            </AuthHookContext.Provider>
        </FirestoreContext.Provider>
    );
};

export default App;
