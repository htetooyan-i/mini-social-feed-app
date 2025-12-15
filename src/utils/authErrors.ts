export function getAuthErrorMessage(error: any): string {
  const code = error?.code;

  switch (code) {
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/email-already-in-use':
      return 'This email is already registered.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/requires-recent-login':
      return 'Please log in again before doing this.';
    case 'auth/no-current-user':
      return 'You must be logged in to do this.';
    default:
      return 'Something went wrong. Please try again.';
  }
}