import { ImageResponse } from "next/og";

export const alt = "Again — Remember what needs doing again";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#fcfbf8",
        backgroundImage: "linear-gradient(rgba(32,38,49,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(32,38,49,.025) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        color: "#202631",
        fontFamily: "Arial, sans-serif",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 54, height: 54, borderRadius: 16, background: "#ffbd18", display: "flex", alignItems: "center", justifyContent: "center", color: "#202631", fontSize: 39, fontWeight: 700 }}>↻</div>
          <div style={{ fontSize: 40, fontWeight: 750, letterSpacing: "-1.8px" }}>Again<span style={{ color: "#ff6b35" }}>.</span></div>
          <div style={{ height: 44, width: 1, background: "#e5e7eb", marginLeft: 14, marginRight: 10 }} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 17, lineHeight: 1.45, color: "#667085" }}><span>Private by default.</span><span>Simple by design.</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 870 }}>
          <div style={{ fontSize: 66, lineHeight: 1.05, fontWeight: 750, letterSpacing: "-3px" }}>Remember what needs<br />doing again.</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 25, lineHeight: 1.4, color: "#737b89" }}>Recurring tasks, clear due dates, and a history you can trust.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 17, color: "#667085" }}>
          <span style={{ width: 12, height: 12, borderRadius: 6, background: "#ff6b35" }} />
          Local-first · Five themes · Built for everyday use
        </div>
        <div style={{ position: "absolute", right: 88, bottom: 84, width: 162, height: 162, border: "18px solid #ffbd18", borderRadius: 100, opacity: 0.72 }} />
        <div style={{ position: "absolute", right: 128, bottom: 126, width: 56, height: 56, border: "10px solid #ff6b35", borderRadius: 100, opacity: 0.82 }} />
      </div>
    ),
    { ...size },
  );
}
