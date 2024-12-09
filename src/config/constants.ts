import { dictionaryLanding } from "./dictionary";

export const APP_ROUTES = [
  { key: "app", text: dictionaryLanding.dashboard, path: "/app/order" },
  { key: "contactUs", text: dictionaryLanding.contact, path: "mailto:sms@stratisplatform.com" },
];

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    icon: "simple-icons:facebook",
    link: "https://facebook.com",
  },
  {
    id: "linkedin",
    icon: "simple-icons:linkedin",
    link: "https://linkedin.com",
  },
  {
    id: "twitter",
    icon: "fa6-brands:x-twitter",
    link: "https://twitter.com",
  },
];

export const LOCALES = ["EN", "ES", "FR"];
