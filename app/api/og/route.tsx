import { ImageResponse } from "next/og"
import { CodeXml } from "lucide-react"
import { profile } from "@/lib/portfolio-data"

export const runtime = "edge"

export async function GET(request: Request) {
  const { origin } = new URL(request.url)
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#fffdf8", color: "#142337", padding: "65px 70px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 18, marginBottom: 30, color: "#687279" }}>
          <CodeXml size={28} color="#ef856b" strokeWidth={1.8} />
          <span>HASSAN EL KHATOURY · MARRAKECH</span>
        </div>
        <div style={{ fontSize: 70, fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.04, display: "flex", flexDirection: "column" }}>
          <span>Building systems</span>
          <span style={{ display: "flex", gap: 12 }}>that <span style={{ background: "#ffe18b", padding: "0 10px 6px" }}>just work.</span></span>
        </div>
        <div style={{ fontSize: 24, marginTop: 32 }}>Java Backend Engineer</div>
        <div style={{ fontSize: 17, color: "#637079", marginTop: 16 }}>Spring Boot · REST APIs · PFE 2027</div>
        <div style={{ fontSize: 15, color: "#637079", marginTop: 48 }}>Oracle Certified Professional · Java SE 11 &amp; 17</div>
      </div>
      <div style={{ width: 265, marginLeft: 40, padding: "14px 14px 25px", background: "#fff", display: "flex", flexDirection: "column", border: "1px solid #e4e0d4", transform: "rotate(4deg)", boxShadow: "0 8px 20px #14233715" }}>
        <img src={origin + profile.photo} alt="" width={235} height={280} style={{ objectFit: "cover" }} />
        <span style={{ fontSize: 16, textAlign: "center", marginTop: 15 }}>hey, I&apos;m Hassan</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#ffe18b" }} />
    </div>,
    { width: 1200, height: 630 }
  )
}
