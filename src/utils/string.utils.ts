export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  if (!/\d/.test(password))
    return "Passwords must have at least one digit ('0'-'9').";
  if (!/[^a-zA-Z0-9]/.test(password))
    return "Passwords must have at least one non alphanumeric character.";
  if (!/[A-Z]/.test(password))
    return "Passwords must have at least one uppercase ('A'-'Z').";
  if (!/[a-z]/.test(password))
    return "Passwords must have at least one lowercase ('a'-'z').";
  if (password.length < 6) return "Passwords must be at least 6 characters.";

  return "";
};

export const formattedUsername = (username: string) => {
  if (username.length < 12) return username;
  return username.slice(0, 6) + "..." + username.slice(-3);
};
