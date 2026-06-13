import React from 'react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';

const HeroWebGLBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden opacity-85 [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
      <DeferredShader>
        <Swirl colorA="#EFEDE5" colorB="#E7E4D9" detail={1.5} />
        <ChromaFlow baseColor="#EFEDE5" downColor="#2F5D50" leftColor="#2F5D50" rightColor="#2E8C68" upColor="#2F5D50" momentum={12} radius={3.0} />
        <FlutedGlass aberration={0.4} angle={30} frequency={6} highlight={0.08} highlightSoftness={0} lightAngle={-90} refraction={3} shape="rounded" softness={1} speed={0.15} />
        <FilmGrain strength={0.03} />
      </DeferredShader>
    </div>
  );
};

export default HeroWebGLBackground;
