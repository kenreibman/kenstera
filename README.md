# Kenstera

Marketing site for Kenstera, a B2B business automation studio. Next.js 16 (App Router), React 19, Tailwind 4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run gen:og   # regenerate public/og-image.jpg
```

## Where things live

| Path | What |
| --- | --- |
| `content/site.ts` | All site copy: systems, planner workflows, method, FAQ, and the featured client. |
| `components/scene/` | The 3D plant. Raw WebGL2, no 3D library. `shaders.ts` draws the leaves, `LeafScene.tsx` runs the camera. |
| `components/home/` | Homepage sections. |
| `components/brand/Leaf.tsx` | The leaf mark and wordmark. |
| `app/globals.css` | Design tokens and the scroll-driven animations. |
| `next.config.ts` | Redirects from the retired routes of the previous site. |

## Adding a client quote

Open `content/site.ts` and fill in `FEATURED_CLIENT` with the client's own words:

```ts
export const FEATURED_CLIENT = {
  name: "TheTickSuit",
  quote: "Their exact words here.",
  person: "First Last",
  role: "Founder",
};
```

While `quote` is empty the Proof section shows the client's name only. It never renders a placeholder quote.

## The 3D scene

- Renders only while a `[data-scene-window]` section is on screen.
- Scroll drives the camera through a hole in the hero leaf; progress is exposed to CSS as `--flight`.
- Resolution adapts to the device, and it steps down if frames run slow.
- Visitors who prefer reduced motion get a single still frame and a static layout.
- Without WebGL2, a CSS and SVG fallback is shown instead.
