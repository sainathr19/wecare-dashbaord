const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "net": false,
        "child_process": false,
        "http2": false,
        "tls": false,
        "events": false,
        "util": false,
        "process": false,
        "stream": false,
        "crypto": false,
        "http": false,
        "https": false,
        "zlib": false,
        "path": false,
        "os": false,
      };
    }
    return config;
  },
}

module.exports = nextConfig