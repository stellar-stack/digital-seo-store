import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
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
            "radial-gradient(circle at 78% 8%, rgba(33,90,245,0.35), transparent 55%), #0a0e1a",
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
              background: "#0071e3",
              color: "#ffffff",
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
          {eyebrow && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#0071e3",
                letterSpacing: 3,
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.4,
            }}
          >
            {description.slice(0, 120)}
          </div>
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
