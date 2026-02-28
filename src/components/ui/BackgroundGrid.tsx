'use client';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 168, 67, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 168, 67, 0.15), transparent 70%)',
        }}
      />
    </div>
  );
}
