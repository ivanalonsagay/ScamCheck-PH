export const APP_NAME = "ScamCheck PH";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export const SCAM_TYPES = [
  "Phishing",
  "Fake Delivery",
  "Fake Seller",
  "Investment Scam",
  "GCash Scam",
  "Banking Scam",
  "Social Media Scam",
  "Romance Scam",
  "Other",
];

export const PLATFORMS = [
  "SMS / Text",
  "Facebook",
  "Messenger",
  "GCash",
  "Email",
  "Shopee",
  "Lazada",
  "Telegram",
  "TikTok",
  "Instagram",
  "Other",
];