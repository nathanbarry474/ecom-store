import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyABUy-8W9QBZ_JzbzXA-EFsmZ4w1u9zWfo",
    authDomain: "ecom-store-project.firebaseapp.com",
    databaseURL: "https://ecom-store-project.firebaseio.com",
    projectId: "ecom-store-project",
    storageBucket: "ecom-store-project.appspot.com",
    messagingSenderId: "503286874058",
    appId: "1:503286874058:web:98b31211058423c332d933",
    measurementId: "G-TVX4GMC1DN"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
 
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;