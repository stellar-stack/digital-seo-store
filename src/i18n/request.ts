import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  // These page copies are English-only for now; fr/es render them in English.
  if (locale !== routing.defaultLocale) {
    const en = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
    for (const ns of ["seoServicesPage", "localSeoPage", "ecommerceSeoPage", "seoAuditPage", "ppcServicesPage", "semServicesPage", "croServicesPage", "wordpressServicesPage", "hireServicesPage", "socialServicesPage", "contentServicesPage", "reputationServicesPage"]) {
      if (!messages[ns]) messages[ns] = en[ns];
    }
  }

  return { locale, messages };
});
