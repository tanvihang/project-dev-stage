/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@devstage/ui', '@devstage/core', '@devstage/components'],
};

module.exports = nextConfig;
