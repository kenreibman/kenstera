import { getImageProps } from "next/image";

/**
 * The rendered monstera (Blender, path traced; see scripts/blender/monstera.py).
 * Transparent WebP with its own contact shadow, so it sits on any dark surface.
 * Phones get the taller framing.
 */
export function Plant({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const common = { alt: "", priority, sizes: "(min-width: 768px) min(1100px, 100vw), 120vw" };
  const wide = getImageProps({ ...common, src: "/plant/plant.webp", width: 2000, height: 1500 });
  const tall = getImageProps({ ...common, src: "/plant/plant-tall.webp", width: 1100, height: 1393 });
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={tall.props.srcSet} sizes={tall.props.sizes} />
      <img {...wide.props} alt="" aria-hidden="true" className={`plant-img ${className}`} />
    </picture>
  );
}
