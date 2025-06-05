import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  env:{
    APIKEY_FORTNITE:'d60d4e00-59f21374-a1c3d875-f9975241',
    STRIPE_SECRET_KEY:"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",
STRIPE_PUBLISHABLE_KEY:"pk_live_51QXYdNLSFgbzik2dKWcPkIvtJ0NR2eiO42JxzoFZh1UyKMHhSXpHGCEYQUPPgH2uICSIaquMDy0Q0DZUkrpvrNsA00dw5hWXOV"    
  },
  images:{
        
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'media.fortniteapi.io',              
        },
        {
          protocol: 'https',
          hostname: 'placehold.co',              
        },
        {
          protocol: 'https',
          hostname: 'fakeimg.pl',
        },
      ],
}
};

export default withPlaiceholder(nextConfig);
