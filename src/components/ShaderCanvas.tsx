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
  isMobile?: boolean;
  onReady?: () => void;
  onUnavailable: () => void;
}

export default function ShaderCanvas({
  currentPhase,
  isMobile = false,
  onReady,
  onUnavailable,
}: ShaderCanvasProps) {
  return (
    <Shader
      className="w-full h-full block"
      style={{ width: "100%", height: "100%" }}
      onReady={onReady}
      onUnavailable={onUnavailable}
    >
      <Spherize
        depth={isMobile ? 0.9 : 1.1}
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
          detail={isMobile ? 0.7 : 1.2}
          speed={isMobile ? 0.35 : 0.5}
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
          speed={isMobile ? 0.6 : 0.9}
          starburstIntensity={0.08}
          starburstPoints={4}
          streakIntensity={0}
          streakLength={0.21}
        />
        <FloatingParticles
          angle={188}
          angleVariance={77}
          opacity={isMobile ? 0.35 : 0.5}
          particleColor="#ffffff"
          particleSize={1}
          randomness={0.3}
          speed={0.1}
          speedVariance={0.6}
          twinkle={isMobile ? 0.5 : 1}
        />
        {!isMobile && (
          <CursorRipples
            chromaticSplit={2}
            decay={4}
          />
        )}
      </Spherize>
      {!isMobile && (
        <FilmGrain
          strength={0.04}
          visible={true}
        />
      )}
    </Shader>
  );
}
