import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase";
//import { ensureRoleDoc } from "./roles";

/**
 * Sign in and ensure a roles/{uid} doc exists (defaults to "viewer").
 * @param remember if true -> persisted across browser restarts
 */
export async function loginWithEmail(email: string, password: string, remember = true) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    //await ensureRoleDoc(user);
    return user;
}
