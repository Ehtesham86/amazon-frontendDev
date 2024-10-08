/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/products', // Your frontend route for API calls
        destination: 'https://amazon-api-five.vercel.app/api/products', // The actual API URL
      },
    ];
  },
};
