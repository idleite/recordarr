/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.discogs.com',
        port: '', // Leave empty for default port
        pathname: '/**', // Match all paths under this hostname
      },
    ],
  },
};

module.exports = nextConfig;
