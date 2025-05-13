import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
        
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.fortniteapi.io',              
        },
      ],
}
};

export default nextConfig;
