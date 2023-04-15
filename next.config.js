/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // this make wagmi esm works
  transpilePackages: ['@lens-protocol'],
}

module.exports = nextConfig;
