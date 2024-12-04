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
export const KYB_FAIL_MESSAGES = {
  1: {
    title: "You need to pass KYB verification",
    text: "Your KYB application has not yet started. Please complete your KYB verification to continue using our services without interruption",
  },
  2: {
    title: "KYB Application Timed Out",
    text: "Your KYB application has timed out. Please resubmit your application or reach out to support if you need assistance in restarting the process.",
  },
  3: {
    title: "Your KYB Application was Declined",
    text: "Please contact our Compliance Officer for further details regarding the status of your Know Your Business application and guidance on restoring compliance.",
  },
  4: {
    title: "KYB Application Successfully Verified",
    text: "Your KYB application has been successfully verified. Our Compliance Officer will review and approve your applications soon.",
  },
  6: {
    title: "Your compliance check was disapproved",
    text: "Please contact our Compliance Officer for further details regarding the status of your compliance check and guidance on restoring compliance status.",
  },
};
