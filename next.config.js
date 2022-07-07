/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")


const nextConfig = withPWA({
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
    JWT_KEY: process.env.JWT_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  pwa: {
    dest: "public",
  }
})

module.exports = nextConfig;
