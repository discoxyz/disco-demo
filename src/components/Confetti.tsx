import React, { FC, useRef, useEffect } from "react";
import { create, CreateTypes } from "canvas-confetti";
import styled from "@emotion/styled";

const ConfettiDiv = styled.canvas({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 0,
});

export interface ConfettiProps {
  text: string;
  url: string;
}

export const Confetti: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null),
    fireRef = useRef<CreateTypes | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fireRef.current = create(canvasRef.current, { resize: true } as any);
    }
    fire();
  }, []);

  const fire = () => {
    if (fireRef.current) {
      fireRef.current({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
      });
    }
  };

  return <ConfettiDiv ref={canvasRef} />;
};

export default Confetti;
