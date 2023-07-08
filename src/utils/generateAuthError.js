export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Invalid user or password...';
    case 'EMAIL_EXISTS':
      return 'A user with that email already exists...';
    default:
      return 'Too many login attempts. Try again later...';
  }
}
