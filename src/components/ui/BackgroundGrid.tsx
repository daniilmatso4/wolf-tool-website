'use client';

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 168, 67, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 168, 67, 0.4) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      {/* Top center glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212, 168, 67, 0.06), transparent 70%)',
        }}
      />
      {/* Bottom accent glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.03), transparent 70%)',
        }}
      />
    </div>
  );
}
