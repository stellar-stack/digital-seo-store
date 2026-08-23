import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/ui/Container";
import { services } from "@/config/services";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70">
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Image
              src="/brand/logo.png"
              alt="Digital SEO Store"
              width={168}
              height={86}
              className="h-9 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              {t("blurb")}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {tNav("servicesLabel")}
            </p>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-white/60 hover:text-amber transition-colors"
                  >
                    {tNav(`services.${s.key}` as never)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t("company")}
            </p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-white/60 hover:text-amber transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-white/60 hover:text-amber transition-colors">
                  {tNav("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/60 hover:text-amber transition-colors">
                  {tNav("blog")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/60 hover:text-amber transition-colors">
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-amber transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {t("getInTouch")}
            </p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a href="mailto:hello@digitalseostore.com" className="hover:text-amber transition-colors">
                  hello@digitalseostore.com
                </a>
              </li>
              <li>
                <a href="tel:+12505056094" className="hover:text-amber transition-colors">
                  +1 250 505 6094
                </a>
              </li>
              <li className="pt-1 text-white/40">{t("offices")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} Digital SEO Store. {t("rights")}
          </p>
          <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            {t("privacy")}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
