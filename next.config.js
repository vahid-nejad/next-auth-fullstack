/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["picsum.photos"],
  },
};

module.exports = nextConfig;
