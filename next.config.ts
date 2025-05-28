import type { NextConfig } from "next";
import withPlaiceholder from "@plaiceholder/next";

const nextConfig: NextConfig = {
  env:{
    APIKEY_FORTNITE:'d60d4e00-59f21374-a1c3d875-f9975241',
    STRIPE_SECRET_KEY:"sk_test_51RTSvpCIPotlomeybthz6DrLxR9epjcydnceiGhlEMdJi3yVrpkYvC3ukqg1HOmvJf5ZL8G90iRGvvuNzAJ0Bpgo00g9zlOtCu",
    STRIPE_PUBLISHABLE_KEY:"pk_test_51RTSvpCIPotlomeysXsp7a4s63KFL6QG8iNLQGXHRyzjurphyEJ7H7TxrpPLA4gdNIJSixe6tRxF8obk66iGkeWM005ZghfPph"
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

export default withPlaiceholder(nextConfig);
