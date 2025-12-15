import { auth } from "./firebase";
import { 
    updatePassword,
    deleteUser,
    EmailAuthProvider,
    createUserWithEmailAndPassword, 
    reauthenticateWithCredential,
    sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    signOut,
    sendEmailVerification } from "firebase/auth";

export const logOut = () => {
    return signOut(auth);
}

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
}

// delete user account but reauthenticate before delete and ensure credential info and current user info are same
// 
export async function deleteUserAccount(email: string, password: string): Promise<void> {

    const user = auth.currentUser;
    if (!user) {
        throw { code: 'auth/no-current-user' };
    }

    await reauthenticate(email, password);
    await deleteUser(user);
}


// won't get error since this func will be called only if there is a logged in user
//
export async function changePassword(oldPassword: string, newPassword: string): Promise<void> {
    
     const user = auth.currentUser;
    if (!user || !user.email) {
        throw { code: 'auth/no-current-user' };
    }

    await reauthenticate(user.email, oldPassword);
    await updatePassword(user, newPassword);
}


// reauthenticate user before sensetive actions
//
export async function reauthenticate(email: string, password: string): Promise<void> {

    const user = auth.currentUser;
    if (!user) throw { code: 'auth/no-current-user'};

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential)

}

// send verfication email only if user logged in
//
export async function verifyEmail(): Promise<void> {
    
    const user = auth.currentUser
    if (!user) throw { code: 'auth/no-current-user'};

    await sendEmailVerification(user)
}
