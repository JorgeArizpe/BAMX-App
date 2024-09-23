import React from 'react';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

interface FirebaseContextType {
    app: FirebaseApp | null;
    auth: Auth | null;
    db: Firestore | null;
}

export const FirebaseContext = React.createContext<FirebaseContextType>({
    app: null,
    auth: null,
    db: null,
});

export const useFirebase = () => React.useContext(FirebaseContext);