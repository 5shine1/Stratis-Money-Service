import { IInputSelectItem } from "@/@types/common";

export const APP_ROUTES = [
  { key: "app", text: "Dashboard", path: "/app/order" },
  { key: "contactUs", text: "Contact Us", path: "mailto:sms@stratisplatform.com" },
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
export const INDUSTRIES: IInputSelectItem[] = [
  {
    group: "Retail",
    items: ["E-commerce", "Brick-and-Mortar", "Fashion & Apparel", "Electronics", "Grocery"],
  },
  {
    group: "Services",
    items: [
      "Professional Services (Legal, Accounting, etc.)",
      "Hospitality (Hotels, Restaurants, etc.)",
      "Entertainment and Leisure (Nightclub, Bars, etc.)",
      "Luxury Services (Yacht Charter, Security etc.)",
      "Healthcare",
      "Education",
      "IT & Software",
    ],
  },
  {
    group: "Finance",
    items: ["Banking", "Insurance", "Investment & Asset Management", "Financial Technology (Fintech)"],
  },
  {
    group: "Entertainment",
    items: ["Media & Publishing", "Gaming", "Music & Arts", "Events Management"],
  },
  {
    group: "Manufacturing",
    items: ["Consumer Goods", "Industrial Goods", "Automotive", "Pharmaceuticals"],
  },
  {
    group: "Non-Profit",
    items: ["Charities", "Educational Institutions", "Religious Organizations"],
  },
  {
    group: "Government & Public Sector",
    items: ["Government Agencies", "Public Utilities"],
  },
  {
    group: "Real Estate",
    items: ["Commercial Real Estate", "Residential Real Estate"],
  },
  {
    group: "Transportation & Logistics",
    items: ["Shipping & Delivery", "Public Transportation", "Warehousing"],
  },
];

export const ACTIVITIES: IInputSelectItem[] = [
  { group: "Sales of Goods", items: ["Physical Goods", "Digital Goods"] },
  {
    group: "Service Provision",
    items: [
      "Professional Services",
      "Subscription Services",
      "Consulting",
      "Accommodation Services ",
      "Dining and Catering",
      "Event Hosting",
    ],
  },
  {
    group: "Entertainment and Leisure",
    items: ["Nightlife Management", "Live Performances", "Tours and Excursions"],
  },
  {
    group: "Luxury Services",
    items: ["Yacht Rentals", "VIP Services", "Spa and Wellness"],
  },
  {
    group: "Financial Services",
    items: ["Lending", "Insurance", "Payment Processing"],
  },
  {
    group: "Content Creation",
    items: ["Digital Media", "Education & Training"],
  },
  {
    group: "Non-Profit Activities",
    items: ["Fundraising", "Membership Fees"],
  },
];

export const VOLUMES = [
  {
    group: "",
    items: [
      "Less than €10,000",
      "€10,000 - €50,000",
      "€50,000 - €100,000",
      "€100,000 - €500,000",
      "€500,000 - €1,000,000",
      "More than €1,000,00",
    ],
  },
];
