export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  if (!/\d/.test(password)) return "Passwords must have at least one digit ('0'-'9').";
  if (!/[^a-zA-Z0-9]/.test(password)) return "Passwords must have at least one non alphanumeric character.";
  if (!/[A-Z]/.test(password)) return "Passwords must have at least one uppercase ('A'-'Z').";
  if (!/[a-z]/.test(password)) return "Passwords must have at least one lowercase ('a'-'z').";
  if (password.length < 6) return "Passwords must be at least 6 characters.";

  return "";
};

export const isValidPhoneNumber = (number: string) => {
  if (/^\+?[1-9]\d{1,14}$/.test(number)) return true;
  return false;
};

export const formattedUsername = (username: string) => {
  if (username.length < 12) return username;
  return username.slice(0, 6) + "..." + username.slice(-3);
};

export const formattedTime = (timestamp: string) => {
  if (timestamp === "now") return "now";
  const now = new Date();
  const diff = now.getTimezoneOffset() * 60000;
  const past = new Date(timestamp);
  const seconds = Math.floor((now.getTime() + diff - past.getTime()) / 1000);

  let interval;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval > 1 ? "s" : "") + " ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
  }

  return seconds + " second" + (seconds > 1 ? "s" : "") + " ago";
};
