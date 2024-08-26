/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.shopify.com',
          pathname: '**',
        },
      ],
    },
    reactStrictMode: true
};

export default nextConfig;
