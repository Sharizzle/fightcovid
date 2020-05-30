import { useContext, useEffect, useState } from 'react';
import { VolunteerSignatureContext } from '../app';
import { TUserInfo, TUserSig } from '../common/volunteer-into-types';
import { useFirestore } from './useFirestore';

export const useReadVolunteerSignaturesForContext: () => undefined | Array<TUserSig> = () => {
    const store = useFirestore();
    const [volSigs, setVolSigs] = useState(undefined as undefined | Array<TUserSig>);

    useEffect(() => {
        let isCancelled = false;
        if (store) {
            store.collection('userSigs').onSnapshot((querySnapshot): void => {
                if (!isCancelled) {
                    const volSigsData = [] as Array<TUserSig>;
                    querySnapshot.forEach(function (doc) {
                        volSigsData.push(doc.data() as TUserSig);
                    });
                    setVolSigs(volSigsData);
                }
            });
        }
        return function cleanup(): void {
            isCancelled = true;
        };
    }, [store]);

    return volSigs;
};

export const useReadVolunteerSignatures = (): undefined | Array<TUserSig> => {
    return useContext(VolunteerSignatureContext);
};

export const useReadFullVolunteerFromID: (id?: string) => undefined | TUserInfo = (id?: string) => {
    const store = useFirestore();
    const [projectData, setProjectData] = useState(undefined as undefined | TUserInfo);

    useEffect(() => {
        let isCancelled = false;
        if (store && id) {
            store
                .collection('users')
                .doc(id)
                .get()
                .then((querySnapshot): void => {
                    if (!isCancelled) {
                        setProjectData(querySnapshot.data() as TUserInfo);
                    }
                });
        }
        return function cleanup(): void {
            isCancelled = true;
        };
    }, [id, store]);

    return projectData;
};

export const useVolunteerCount = (): undefined | number => {
    const volunteerSignatures = useReadVolunteerSignatures();
    return volunteerSignatures?.length;
};
