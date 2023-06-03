/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn-icons-png.flaticon.com',
      'platform-lookaside.fbsbx.com',
      'links.papareact.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      's.gravatar.com',
      'img.freepik.com',
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
