import { dictionaryGlobal } from "@/config/dictionary";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string, locale: string) => {
  if (!/\d/.test(password)) return dictionaryGlobal.passwordErrors.digit[locale];
  if (!/[^a-zA-Z0-9]/.test(password)) return dictionaryGlobal.passwordErrors.nonAlphanumeric[locale];
  if (!/[A-Z]/.test(password)) return dictionaryGlobal.passwordErrors.uppercase[locale];
  if (!/[a-z]/.test(password)) return dictionaryGlobal.passwordErrors.lowercase[locale];
  if (password.length < 6) return dictionaryGlobal.passwordErrors.minLength[locale];

  return "";
};

export const isValidPhoneNumber = (number: string) => {
  if (/^\+?[0-9]\d{1,14}$/.test(number)) return true;
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

export const isValidReference = (link: string) => {
  const pattern = /^[a-zA-Z0-9-]+$/;
  return pattern.test(link);
};

export const shortenAddress = (address: string) => {
  if (address.length < 8) return address;
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const shortenString = (address: string, from: number, to: number) => {
  if (address.length < from + to) return address;
  return address.slice(0, from) + "..." + address.slice(-1 * to);
};

export const isValidBankIBAN = (iban: string) => {
  // Step 1: Clean the IBAN (remove spaces and convert to uppercase)
  iban = iban.replace(/\s+/g, "").toUpperCase();
  // Step 2: General IBAN regex
  const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  // Step 3: Check if IBAN matches the regex pattern
  if (!ibanRegex.test(iban)) {
    return false;
  }
  // Step 4: Rearrange the IBAN for mod-97 calculation
  const rearrangedIban = iban.slice(4) + iban.slice(0, 4);
  // Step 5: Convert letters to numbers (A = 10, B = 11, ..., Z = 35)
  const ibanNumeric = rearrangedIban
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 65 && code <= 90 ? (code - 55).toString() : char; // A-Z -> 10-35
    })
    .join("");
  // Step 6: Perform the mod-97 check using string-based division
  let remainder = ibanNumeric;
  while (remainder.length > 2) {
    const chunk = remainder.slice(0, 9); // Take 9 digits at a time
    remainder = (parseInt(chunk, 10) % 97).toString() + remainder.slice(9);
  }
  // Final mod-97 result
  return parseInt(remainder, 10) % 97 === 1;
};
export const isValidBIC = (bic: string) => {
  // Clean the input by removing any spaces and convert to uppercase
  bic = bic.replace(/\s+/g, "").toUpperCase();

  // BIC (SWIFT code) regex pattern
  const bicRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

  // Check if the BIC matches the pattern
  return bicRegex.test(bic);
};
