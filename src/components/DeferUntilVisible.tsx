import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Renders its children only once the placeholder has come near the viewport. Heavy visuals (canvas, 3D)
 * are therefore not even downloaded or started until the visitor scrolls close to them. The placeholder
 * keeps its size, so nothing jumps when the content appears.
 */
export default function DeferUntilVisible({
  children,
  className = "",
  rootMargin = "300px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, rootMargin);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (near) setShown(true);
  }, [near]);

  return (
    <div ref={ref} className={className}>
      {shown ? children : null}
    </div>
  );
}
