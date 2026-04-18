// ============================================================
//  SITE CONFIG — edit this file to update your whole website
// ============================================================

// ─── BRAND ───────────────────────────────────────────────────
export const SITE_NAME = "MizzenIQ";
export const SITE_TAGLINE = "Data-driven insights for better business decisions";
export const SITE_DESCRIPTION =
  "Transform your data into actionable insights. MizzenIQ helps businesses make faster, more accurate decisions with advanced analytics and strategic intelligence.";

// ─── LOGO ────────────────────────────────────────────────────
// Option A: Use your own image file
//   1. Upload your logo to the /public/images/ folder in GitHub
//   2. Set LOGO_IMAGE to the filename, e.g. "/images/logo.png"
//   3. Set LOGO_USE_IMAGE to true
//
// Option B: Keep the icon + text logo (default)
//   Set LOGO_USE_IMAGE to false
export const LOGO_USE_IMAGE = true;
export const LOGO_IMAGE = "/Website-Miz/images/logo.png"; // only used if LOGO_USE_IMAGE is true
export const LOGO_ALT = "MizzenIQ logo";

// ─── IMAGES ──────────────────────────────────────────────────
// To replace: upload your image to /public/images/ on GitHub
// then change the URL below to "/images/your-file.jpg"
export const IMAGES = {
  // Hero background on the home page
  heroBg: "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa",
  heroBgAlt: "Abstract data visualization with flowing networks",
};

// ─── CONTACT ─────────────────────────────────────────────────
export const CONTACT = {
  email: "info@mizzeniq.com",
  phone: "+1 (555) 123-4567",
  phoneTel: "+15551234567", // no spaces/dashes, used in href="tel:..."
  address: "742 Market Street, San Francisco, CA 94103",
  addressShort: "San Francisco, CA",
  hours: "Monday - Friday, 9:00 AM - 6:00 PM PST",
};

// ─── SOCIAL LINKS ────────────────────────────────────────────
// Set to null to hide a social icon
export const SOCIAL = {
  linkedin: "https://linkedin.com/company/mizzeniq",
  twitter: "https://twitter.com/mizzeniq",
  github: null, // hidden — set a URL to show it
};

// ─── NAVIGATION ──────────────────────────────────────────────
export const NAV_ITEMS = [
  { name: "Home",      path: "/" },
  { name: "Services",  path: "/services" },
  { name: "Solutions", path: "/solutions" },
  { name: "About",     path: "/about" },
  { name: "Contact",   path: "/contact" },
];
