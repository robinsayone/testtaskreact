export function FirebaseErrorHandler(errorCode) {
      switch (errorCode) {
        case "auth/account-exists-with-different-credential":
        case "auth/credential-already-in-use":
        case "auth/email-already-in-use":
            return "Email already used. Go to login page.";
            break;
        case "auth/wrong-password":
            return "Wrong email/password combination.";
            break;
        case "auth/user-not-found":
            return "No user found with this email.";
            break;
        case "auth/user-disabled":
            return "User disabled.";
            break;
        case "auth/too-many-requests":
            return "Too many requests to log into this account.";
            break;
        case "auth/operation-not-allowed":
            return "Server error, please try again later.";
            break;
        case "auth/invalid-email":
            return "Email address is invalid.";
            break;
        default:
            return "Login failed. Please try again.";
            break;
    }
}