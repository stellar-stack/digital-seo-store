import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/search-engine-optimization",
        destination: "/en/services/seo-services",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|es)/services/seo",
        destination: "/:locale/services/seo-services",
        permanent: true,
      },
      {
        source: "/ppc-management-services",
        destination: "/en/services/ppc-management-services",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|es)/services/ppc",
        destination: "/:locale/services/ppc-management-services",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|es)/services/cro",
        destination: "/:locale/services/conversion-rate-optimization",
        permanent: true,
      },
      {
        source: "/:locale(en|fr|es)/pricing",
        destination: "/:locale/answers",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
