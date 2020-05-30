import { useCallback, useContext, useEffect, useState } from 'react';
import { AnalyticsContext, CurrentUserInfoContext } from '../app';

import { useAuthUser } from './authHooks';
import { TUserInfo, TUserSig } from '../common/volunteer-into-types';
import { useFirestore } from './useFirestore';

export const useInitialiseUserWithIdAndEmail: () => (newUserId: string, newUserEmail: string) => Promise<void> = () => {
    const store = useFirestore();

    const analytics = useContext(AnalyticsContext);

    return useCallback(
        async (newUserId: string, newUserEmail: string) => {
            if (store) {
                if (analytics) {
                    analytics.logEvent('user_data_initialised');
                }
                const newUserDocRef = store.collection('users').doc(newUserId);
                return await newUserDocRef.set({
                    id: newUserId,
                    email: newUserEmail,
                    name: '',
                    description: '',
                    contactLinks: '',
                    location: '',
                    hoursPerWeekPercent: 0,
                    skillsTagIDs: [] as Array<string>,
                    userIsDefined: false,
                    listUser: false,
                } as TUserInfo);
            } else {
                console.error('Store not initialised! Cannot create new user!');
            }
        },
        [store],
    );
};

export const useListenToCurrentUserInfoForContext: () => undefined | TUserInfo = () => {
    const { authUser } = useAuthUser();
    const store = useFirestore();

    const currentUserID = authUser?.uid;
    const currentUserEmail = authUser?.email;
    const [currentUserInfoState, setCurrentUserInfoState] = useState(undefined as undefined | TUserInfo);
    useEffect(() => {
        let isCancelled = false;
        if (currentUserID && currentUserEmail && !!store) {
            const userDocRef = store.collection('users').doc(currentUserID);
            userDocRef.onSnapshot((values) => {
                if (values.data()) {
                    if (!isCancelled) {
                        setCurrentUserInfoState(values.data() as TUserInfo);
                    }
                } else {
                    console.error('User data undefined!');
                }
            });
            return;
        }
        // If my-profile isn't logged in, or store not initialised, make sure my-profile data is undefined..
        // In particular, this is needed for logout.
        setCurrentUserInfoState(undefined);

        return function cleanup(): void {
            isCancelled = true;
        };
    }, [currentUserID, currentUserEmail, store]);

    return currentUserInfoState;
};

export const useReadCurrentUserInfo: () => undefined | TUserInfo = () => {
    return useContext(CurrentUserInfoContext);
};

export const useWriteCurrentUserInfo: () => (userInfo: TUserInfo) => void = () => {
    const store = useFirestore();
    const { authUser } = useAuthUser();

    return useCallback(
        async (userInfo: TUserInfo): Promise<void> => {
            if (!!store && authUser?.uid) {
                const userDocRef = store.collection('users').doc(authUser.uid);
                if (!!userDocRef) {
                    const {
                        id,
                        email,
                        name,
                        description,
                        skillsTagIDs,
                        contactLinks,
                        hoursPerWeekPercent,
                        location,
                        listUser,
                    } = userInfo;

                    const mainUpdatePromise = userDocRef.set({
                        id: id,
                        name: name,
                        email: email,
                        description: description,
                        skillsTagIDs: skillsTagIDs,
                        contactLinks: contactLinks,
                        hoursPerWeekPercent: hoursPerWeekPercent,
                        location: location,
                        userIsDefined: true,
                        listUser: listUser,
                    } as TUserInfo);

                    const userSigDocRef = store.collection('userSigs').doc(authUser.uid);
                    const sigUpdatePromise = userSigDocRef.set({
                        id: id,
                        skillsTagIDs: skillsTagIDs,
                        hoursPerWeekPercent: hoursPerWeekPercent,
                        listUser: listUser,
                    } as TUserSig);

                    await mainUpdatePromise;
                    await sigUpdatePromise;
                    return;
                }
                console.error('Cannot set my-profile info (null userDocRef)!');
                return;
            }
            console.error('Cannot set my-profile info (null store or uid)');
            return;
        },
        [store, authUser],
    );
};

// If a user has signed up at auth but hasn't filled out form / accepted
// privacy agreement.
export const useUserDefinitelyNeedsInit: () => boolean = () => {
    const userInfo = useReadCurrentUserInfo();
    const { authUser, initializing } = useAuthUser();
    return !initializing && !!authUser && !!userInfo && !userInfo?.userIsDefined;
};
