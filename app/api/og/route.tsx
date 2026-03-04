import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { origin } = new URL(request.url)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(145deg, #0B0F19 0%, #111827 50%, #0B0F19 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)",
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "48px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Profile photo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              border: "3px solid rgba(99,102,241,0.3)",
              boxShadow: "0 0 40px rgba(99,102,241,0.15)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${origin}/images/profile.png`}
              alt=""
              width={180}
              height={180}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {/* Accent line */}
            <div
              style={{
                width: "48px",
                height: "3px",
                borderRadius: "2px",
                background: "linear-gradient(90deg, #6366f1, #818cf8)",
                marginBottom: "4px",
              }}
            />

          {/* Name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#f1f5f9",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            Hasan El Khatoury
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#818cf8",
              letterSpacing: "0.5px",
              marginTop: "4px",
            }}
          >
            Java Backend Engineer
          </div>

          {/* Separator dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
              marginBottom: "4px",
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#475569",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#475569",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#475569",
              }}
            />
          </div>

          {/* Tagline pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
            }}
          >
            {["Distributed Systems", "Microservices", "Cloud-Native"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#94a3b8",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(148,163,184,0.15)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          {/* Certs line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "20px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#64748b",
            }}
          >
            <span>Oracle Certified Professional</span>
            <span style={{ color: "#475569" }}>·</span>
            <span>OCI Foundations Associate</span>
          </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #6366f1, #818cf8, #6366f1, transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
