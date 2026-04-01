import path from 'path'
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'demo.nextmerce.com'
      },
    ],
  },
    turbopack: {
    root: path.resolve('./') ,
  },
};

export default nextConfig;
