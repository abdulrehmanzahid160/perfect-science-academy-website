const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl = (configuredUrl
  ? configuredUrl
  : "https://www.perfectscienceacademy.online"
).replace(/\/$/, "");
