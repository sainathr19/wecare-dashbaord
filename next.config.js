/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      "fs": false,
      "net": false,
      "child_process": false,
    };
    return config;
  },
}

module.exports = nextConfig