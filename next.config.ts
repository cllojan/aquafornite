import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{
    APIKEY_FORTNITE:'d60d4e00-59f21374-a1c3d875-f9975241'
  },
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
