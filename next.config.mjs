/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  // JBV: BEGIN images allowlist
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "v5.airtableusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "v2.airtableusercontent.com", pathname: "/**" },
      { protocol: "https", hostname: "dl.airtable.com", pathname: "/**" },
      { protocol: "https", hostname: "logo.clearbit.com", pathname: "/**" },
    ],
  },
  // JBV: END images allowlist
};
export default nextConfig;
