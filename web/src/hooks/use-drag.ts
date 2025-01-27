import { useState, useEffect, RefObject, useRef } from "react";

function guard(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export const useDrag = (
  divRef: RefObject<HTMLDivElement>,
  divW: number,
  divH: number
) => {
  const [pos, setPos] = useState({
    x: (window.innerWidth - divW) / 2,
    y: (window.innerHeight - divH) / 2,
  });

  const mounted = useRef<boolean>(false);
  const isDragging = useRef(false);
  const frame = useRef(0);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

    const handleDrag = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);

      // const target = e.target as HTMLElement;
      // if (target?.id !== "drag-handle") return;

      frame.current = requestAnimationFrame(() => {
        const rect = divRef.current?.getBoundingClientRect();
        if (!rect || !isDragging.current) return;

        setPos({
          //      x: clamp((e.clientX - window.screenLeft) / window.screen.width, 0, 1),
          //    y: clamp((e.clientY - window.screenTop) / window.screen.height, 0, 1),
          // x: clamp((x - rext.left) / rect.width, 0, 100),
          // y: clamp((y - rect.top) / rect.height, 0, 100),
          //   x: clamp(pos.x + e.movementX, 0, 1),
          //   y: clamp(pos.y + e.movementY, 0, 1),
          x: guard(e.clientX - rect?.width / 2, 0, vw - rect.width),
          y: guard(e.clientY - 20, 0, vh - rect.height),
        });
      });
    };

    const startDragging = () => {
      if (isDragging.current && !mounted.current) return;
      isDragging.current = true;
    };
    const stopDragging = () => {
      if (!isDragging.current && !mounted.current) return;
      isDragging.current = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.id !== "drag-handle") return;

      startDragging();
      // e.preventDefault();

      handleDrag(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        handleDrag(e);
      }
    };

    if (mounted.current) {
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("mousemove", handleMouseMove);

      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", stopDragging);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }

    return () => {};
  }, [pos, isDragging]);

  return { x: pos.x, y: pos.y };
};
