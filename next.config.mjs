/** @type {import('next').NextConfig} */
const nextConfig = {
    headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    }
                ],
            },
        ];
    }
};

export default nextConfig;
