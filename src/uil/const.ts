export const ERRORS = {
    INVALID_LOGIN_CREDENTIALS: "Invalid email or password.",
    USER_DISABLED: "This account has been disabled.",
    TOO_MANY_REQUESTS: "Too many attempts. Please try again later.",
    NETWORK_ERROR: "Network error. Check your connection.",
    DEFAULT_LOGIN_ERROR: "Login failed.",
} as const;

export type FirebaseAuthErrorCode =
    | "auth/invalid-credential"
    | "auth/wrong-password"
    | "auth/invalid-email"
    | "auth/user-disabled"
    | "auth/user-not-found"
    | "auth/too-many-requests"
    | "auth/network-request-failed";

export function getAuthErrorMessage(code?: string, fallback?: string): string {
    const map: Record<FirebaseAuthErrorCode, string> = {
        "auth/invalid-credential": ERRORS.INVALID_LOGIN_CREDENTIALS,
        "auth/wrong-password": ERRORS.INVALID_LOGIN_CREDENTIALS,
        "auth/invalid-email": ERRORS.INVALID_LOGIN_CREDENTIALS,
        "auth/user-disabled": ERRORS.USER_DISABLED,
        "auth/user-not-found": ERRORS.INVALID_LOGIN_CREDENTIALS,
        "auth/too-many-requests": ERRORS.TOO_MANY_REQUESTS,
        "auth/network-request-failed": ERRORS.NETWORK_ERROR,
    };

    if (code && (code as FirebaseAuthErrorCode) in map) {
        return map[code as FirebaseAuthErrorCode];
    }
    return fallback || ERRORS.DEFAULT_LOGIN_ERROR;
}
