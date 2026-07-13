/**
 * Generates the social share / OpenGraph card at public/og-image.jpg.
 *
 * Renders a branded 1200x630 card with next/og (Satori + resvg, bundled inside
 * Next) and rasterizes the PNG to JPG with sharp. On-brand with the landing:
 * black canvas, Manrope wordmark, Instrument Serif italic tagline.
 *
 * Run: npx tsx --tsconfig tsconfig.scripts.json scripts/generate-og.tsx
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
          background:
            "radial-gradient(120% 120% at 15% 0%, #1a1a1a 0%, #000000 55%)",
          padding: "72px 80px",
          fontFamily: "Manrope",
          position: "relative",
        }}
      >
        {/* Subtle top hairline accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background:
              "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0) 60%)",
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          Kenstera
        </div>

        {/* Headline block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 116,
              lineHeight: 1.02,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            <span>Rapid Growth</span>
            <span>For Business</span>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 760,
              fontSize: 27,
              lineHeight: 1.45,
              fontWeight: 400,
              color: "rgba(255,255,255,0.62)",
            }}
          >
            High-converting websites, workflow automations, and marketing
            systems that drive predictable growth.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span>kenstera.com</span>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            Websites · Automation · Marketing
          </span>
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Manrope", data: manrope400, style: "normal", weight: 400 },
        { name: "Manrope", data: manrope700, style: "normal", weight: 700 },
        {
          name: "Instrument Serif",
          data: serifItalic,
          style: "italic",
          weight: 400,
        },
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
