/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['avatars.githubusercontent.com', 'raw.githubusercontent.com'],
        unoptimized: true
    },
    experimental: {
        images: {
            layoutRaw: true,
        },
    },
};

module.exports = nextConfig;
