import React, { useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { AnalyticsContext, AuthHookContext } from '../app';
import { useRedirect } from './useRedirect';
import { LoginRoute } from '../routing/route-mapping';

export interface AuthState {
    initializing: boolean;
    authUser: firebase.User | null;
}

export const useAuthForContext: () => AuthState = () => {
    const [state, setState] = React.useState(() => {
        const user = firebase.auth().currentUser;
        return { initializing: !user, authUser: user } as AuthState;
    });

    const onChange = (user: firebase.User | null): void => {
        setState({ initializing: false, authUser: user } as AuthState);
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
        return (): void => unsubscribe();
    }, []);

    return state;
};

export const useAuthUser: () => AuthState = () => {
    const auth = useContext(AuthHookContext);
    if (auth !== undefined) {
        return auth as AuthState;
    }
    return { initializing: true, authUser: null } as AuthState;
};

export const useEmailPasswordSignUp: () => (
    email: string,
    password: string,
) => Promise<firebase.auth.UserCredential> = () => {
    const analytics = useContext(AnalyticsContext);
    return (email: string, password: string): Promise<firebase.auth.UserCredential> => {
        if (analytics) {
            analytics.logEvent('email_password_sign_up_clicked');
        }
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
};

export const useEmailPasswordLogin: () => (
    email: string,
    password: string,
) => Promise<firebase.auth.UserCredential> = () => {
    const analytics = useContext(AnalyticsContext);
    return (email: string, password: string): Promise<firebase.auth.UserCredential> => {
        if (analytics) {
            analytics.logEvent('email_password_login_clicked');
        }
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
};

export const useGoogleLoginSignUp: () => () => Promise<firebase.auth.UserCredential> = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const analytics = useContext(AnalyticsContext);
    return (): Promise<firebase.auth.UserCredential> => {
        if (analytics) {
            analytics.logEvent('google_continue_clicked');
        }
        return firebase.auth().signInWithPopup(provider);
    };
};

export const useSignOut: () => () => Promise<void> = () => {
    const redirect = useRedirect();
    return (): Promise<void> =>
        firebase
            .auth()
            .signOut()
            .then(() => {
                redirect(LoginRoute.url);
            })
            .catch((e) => {
                console.error(e);
            });
};
