import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Digital SEO Store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px",
          background:
            "radial-gradient(circle at 78% 8%, rgba(245,166,35,0.35), transparent 55%), #0a0e1a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#f5a623",
              color: "#0a0e1a",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
              DIGITAL
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: 4 }}>
              SEO STORE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 920 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {t("titleDefault").split(" — ")[0]}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.4,
            }}
          >
            {t("description").slice(0, 120)}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
