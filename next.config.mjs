/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        NEXT_BACKEND_URL: "http://192.168.1.69:8080"
    }
};

export default nextConfig;
