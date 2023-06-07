"use client";

import { useEffect, useRef } from "react";
import FireCrackerFactory from "@/classes/FireCrackerFactory";

type Props = {
  fireCrackerCount: number;
};

export default function FireCracker({ fireCrackerCount }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;

        ctx?.scale(devicePixelRatio, devicePixelRatio);

        let startTime = 0;
        let id = 0;
        const fireCrackers: FireCrackerFactory[] = [];

        for (let i = 0; i < fireCrackerCount; i++) {
          const x = 300 + Math.random() * (window.innerWidth - 600);
          const y = 150 + Math.random() * 150;
          const fireCracker = new FireCrackerFactory(x, y, ctx!);

          fireCracker.update();
          fireCrackers.push(fireCracker);
        }

        const animate = () => {
          id = requestAnimationFrame((timestamp) => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            if (!startTime) {
              startTime = timestamp;
            }

            fireCrackers.forEach((fireCracker) => {
              fireCracker.loop(timestamp - startTime);
            });

            animate();
          });
        };

        animate();

        return () => cancelAnimationFrame(id);
      }
    }
  }, []);

  return <canvas className="fixed top-16 left-0 z-10" ref={canvasRef} />;
}
