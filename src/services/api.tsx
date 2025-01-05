import {db, app} from "../config/firebaseConfig"
import { setDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { IUser } from "../interfaces/IUser";

export const auth = getAuth(app);

export async function registerUser(user: IUser): Promise<void> {
    const userDocRef = doc(db, "users", user.id);
    await setDoc(userDocRef, user);
}

export async function authenticateUser(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function fetchUserData(uid: string): Promise<IUser | null> {
    try {
        const userDocRef = doc(db, "users", uid);
        console.log("Fetching document from path:", userDocRef.path);

        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
            console.warn(`Document not found for UID: ${uid}`);
            return null;
        }

        console.log("Document data:", userDoc.data());
        return userDoc.data() as IUser;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}


export async function updateLastLogin(uid: string): Promise<void> {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { lastLogin: serverTimestamp() });
}