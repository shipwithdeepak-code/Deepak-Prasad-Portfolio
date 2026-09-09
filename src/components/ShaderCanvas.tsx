import React from "react";
import {
  Shader,
  Spherize,
  Swirl,
  LensFlare,
  FloatingParticles,
  CursorRipples,
  FilmGrain,
} from "shaders/react";

interface ShaderCanvasProps {
  currentPhase: {
    accent: string;
    mid: string;
    light: string;
  };
  onUnavailable: () => void;
}

export default function ShaderCanvas({ currentPhase, onUnavailable }: ShaderCanvasProps) {
  return (
    <Shader
      className="w-full h-full block"
      style={{ width: "100%", height: "100%" }}
      onUnavailable={onUnavailable}
    >
      <Spherize
        depth={1.1}
        lightColor="#fef3c7"
        lightIntensity={0.85}
        lightPosition={{ x: 0.62, y: 0.08 }}
        lightSoftness={0.2}
        radius={1}
      >
        <Swirl
          colorA={currentPhase.light}
          colorB={currentPhase.mid}
          stops={[
            { color: currentPhase.light, position: 0 },
            { color: currentPhase.mid, position: 0.5 },
            { color: currentPhase.accent, position: 1 },
          ]}
          colorSpace="oklab"
          detail={1.2}
          speed={0.5}
        />
        <LensFlare
          ghostChroma={0}
          ghostIntensity={0.35}
          ghostSpread={0.78}
          glareIntensity={0.25}
          glareSize={0.18}
          haloChroma={0.5}
          haloIntensity={0.3}
          haloRadius={0.38}
          haloSoftness={1.1}
          lightPosition={{ x: 0.6, y: 0.1 }}
          speed={0.9}
          starburstIntensity={0.08}
          starburstPoints={4}
          streakIntensity={0}
          streakLength={0.21}
        />
        <FloatingParticles
          angle={188}
          angleVariance={77}
          opacity={0.5}
          particleColor="#ffffff"
          particleSize={1}
          randomness={0.3}
          speed={0.1}
          speedVariance={0.6}
          twinkle={1}
        />
        <CursorRipples
          chromaticSplit={2}
          decay={4}
        />
      </Spherize>
      <FilmGrain
        strength={0.04}
        visible={true}
      />
    </Shader>
  );
}
