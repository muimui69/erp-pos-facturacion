/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/:subdomain/oauth',
                destination: '/subdomain',
            },
        ]
    },
};

export default nextConfig;
