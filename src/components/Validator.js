export const checkEmail = (email) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length === 0) {
    errors.push("Required field");
  }

  if (!emailRegex.test(email)) {
    errors.push("Invalid email");
  }

  return errors;
};

export const checkPassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  if (!password.match(/[a-z]/)) {
    errors.push("Password must include at least 1 lowercase letter");
  }

  if (!password.match(/[A-Z]/)) {
    errors.push("Password must include at least 1 uppercase letter");
  }

  if (!password.match(/[0-9]/)) {
    errors.push("Password must include at least 1 number");
  }

  return errors;
};

export const checkUsername = (userName) => {
  const errors = [];

  if (userName.length === 0) {
    errors.push("Required field");
  }

  return errors;
};

export const checkConfirmPassword = (password, confirmPassword) => {
  const errors = [];

  if (confirmPassword.length === 0) {
    errors.push("Required field");
  }

  if (password && confirmPassword && confirmPassword !== password) {
    errors.push("Passwords do not match");
  }

  return errors;
};
