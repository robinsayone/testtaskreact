export function passwordValidator(password) {
  let message = (!password || password.length <= 0) ? "Password can't be empty." :
                (password.length > 20) ? 'Password cannot exceed 20 characters.' :
                (password.length < 6) ? 'Password should be more than 6 characters.' :
                (/[^a-zA-Z0-9\-\/]/.test(password)) ? 'Password must be alphanumeric.' :
                '';
  return message;
}
