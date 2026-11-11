/**
 * Generates the social share / OpenGraph card at public/og-image.jpg.
 *
 * Renders a branded 1200x630 card with next/og (Satori + resvg, bundled inside
 * Next) and rasterizes the PNG to JPG with sharp.
 *
 * Run: npm run gen:og
 */
import { ImageResponse } from "next/og";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import React from "react";

const ASSETS = join(process.cwd(), "scripts", "og-assets");
const manrope400 = readFileSync(join(ASSETS, "Manrope-400.woff"));
const manrope700 = readFileSync(join(ASSETS, "Manrope-700.woff"));
const serifItalic = readFileSync(join(ASSETS, "InstrumentSerif-Italic.ttf"));

const WIDTH = 1200;
const HEIGHT = 630;
const INK = "#06120c";
const LIME = "#c9f65f";
const PAPER = "#f1ecdd";

const LEAF =
  "M50 24C46 10 30 2 17 8 3 15 0 34 6 52c7 22 28 40 44 54 16-14 37-32 44-54 6-18 3-37-11-44C70 2 54 10 50 24Z";
const SLITS = "M31 41-4 57M34 59 4 80M39 76 20 98M69 41 104 57M66 59 96 80M61 76 80 98";

function Leaf({ size, color, cut }: { size: number; color: string; cut: string }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 100 110">
      <path d={LEAF} fill={color} />
      <path d={SLITS} stroke={cut} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <ellipse cx="39" cy="35" rx="3.2" ry="2.2" fill={cut} />
      <ellipse cx="61" cy="35" rx="3.2" ry="2.2" fill={cut} />
      <ellipse cx="41" cy="53" rx="3" ry="2" fill={cut} />
      <ellipse cx="59" cy="53" rx="3" ry="2" fill={cut} />
    </svg>
  );
}

async function main() {
  const image = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `radial-gradient(90% 110% at 85% 30%, #14402c 0%, ${INK} 62%)`,
          padding: "68px 80px",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -40, top: 60, display: "flex", transform: "rotate(14deg)" }}>
          <Leaf size={520} color="#1f6b46" cut="#0a2317" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 700, color: PAPER }}>
          <Leaf size={34} color={LIME} cut={INK} />
          Kenstera
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 124,
              lineHeight: 0.98,
              color: PAPER,
              letterSpacing: "-0.01em",
            }}
          >
            <span>Make your business</span>
            <span style={{ color: LIME }}>thrive.</span>
          </div>
          <div style={{ display: "flex", maxWidth: 700, fontSize: 27, lineHeight: 1.45, color: "rgba(241,236,221,0.72)" }}>
            Websites, automations, and follow-up systems that catch every lead and take the busywork off your team.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, fontWeight: 500, color: "rgba(241,236,221,0.75)" }}>
          kenstera.com
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Manrope", data: manrope400, style: "normal", weight: 400 },
        { name: "Manrope", data: manrope700, style: "normal", weight: 700 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    }
  );

  const png = Buffer.from(await image.arrayBuffer());
  const jpg = await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  const out = join(process.cwd(), "public", "og-image.jpg");
  writeFileSync(out, jpg);
  console.log(`Wrote ${out} (${WIDTH}x${HEIGHT}, ${(jpg.length / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
