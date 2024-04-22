/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/site.webmanifest',
                destination: 'https://tx.shadcn.com/site.webmanifest',
            },
        ]
    },
};

export default nextConfig;
