import firebase from 'firebase';
import { useContext } from 'react';
import { FirestoreContext } from '../app';

export const useFirestore: () => undefined | firebase.firestore.Firestore = () => {
    return useContext(FirestoreContext);
};
