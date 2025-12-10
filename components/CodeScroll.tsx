"use client";

import { motion } from "framer-motion";

const codeLines = [
  // let site = {
  [
    { t: "let", c: "text-purple-400" },
    { t: " site ", c: "text-neutral-300" },
    { t: "= ", c: "text-neutral-500" },
    { t: "{", c: "text-neutral-300" },
  ],

  // speed: 42,
  [
    { t: "  speed: ", c: "text-neutral-300" },
    { t: "42", c: "text-neutral-300" },
    { t: ",", c: "text-neutral-300" },
  ],

  // conversions: 0,
  [
    { t: "  conversions: ", c: "text-neutral-300" },
    { t: "0", c: "text-neutral-300" },
    { t: ",", c: "text-neutral-300" },
  ],

  // design: "outdated"
  [
    { t: "  design: ", c: "text-neutral-300" },
    { t: '"outdated"', c: "text-neutral-300" },
  ],

  [{ t: "};", c: "text-neutral-300" }],

  [],

  // const upgradeSite = (site) => {
  [
    { t: "const", c: "text-purple-400" },
    { t: " upgradeSite ", c: "text-neutral-300" },
    { t: "= ", c: "text-neutral-500" },
    { t: "(site) => ", c: "text-neutral-300" },
    { t: "{", c: "text-neutral-300" },
  ],

  // site.speed = 99;
  [
    { t: "  site.speed", c: "text-neutral-300" },
    { t: " = ", c: "text-neutral-500" },
    { t: "99", c: "text-neutral-300" },
    { t: ";", c: "text-neutral-300" },
  ],

  // site.design = "clean & modern";
  [
    { t: "  site.design", c: "text-neutral-300" },
    { t: " = ", c: "text-neutral-500" },
    { t: '"clean & modern"', c: "text-neutral-300" },
    { t: ";", c: "text-neutral-300" },
  ],

  // site.conversions += 200;
  [
    { t: "  site.conversions += ", c: "text-neutral-300" },
    { t: "200", c: "text-neutral-300" },
    { t: ";", c: "text-neutral-300" },
  ],

  // return site;
  [{ t: "  return site;", c: "text-neutral-300" }],

  [{ t: "};", c: "text-neutral-300" }],

  [],

  // comment
  [{ t: "// run optimization", c: "text-neutral-500 italic" }],

  // const result = upgradeSite(site);
  [
    { t: "const", c: "text-purple-400" },
    { t: " result ", c: "text-neutral-300" },
    { t: "= ", c: "text-neutral-500" },
    { t: "upgradeSite", c: "text-neutral-300" },
    { t: "(site);", c: "text-neutral-300" },
  ],

  // console.log("Optimized site:", result)
  [
    { t: "console.log", c: "text-neutral-300" },
    { t: "(", c: "text-neutral-300" },
    { t: '"Optimized site:"', c: "text-neutral-300" },
    { t: ", result)", c: "text-neutral-300" },
  ],
];

export function CodeScroll() {
  const doubled = [...codeLines, ...codeLines];

  return (
    <div className="relative h-40 overflow-hidden rounded-xl bg-neutral-950/90 font-mono text-[11px] leading-relaxed px-4 py-3">
      <motion.div
        className="flex flex-col gap-0.5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubled.map((line, i) => (
          <div key={i} className="whitespace-pre flex">
            {Array.isArray(line) && line.length > 0 ? (
              line.map((token, j) => (
                <span key={j} className={token.c}>
                  {token.t}
                </span>
              ))
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-neutral-950 to-transparent" />
    </div>
  );
}

