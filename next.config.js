/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*', "3000--dev--record--harry-esses.coder.harryesses.com.", "3000--dev--record--harry-esses.coder.harryesses.com"],
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
