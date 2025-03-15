export function AceternityGrid() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
      {/* Main grid */}
      <div className="absolute inset-0 bg-grid-white/[0.04] bg-[size:32px_32px]" />
      {/* Smaller grid */}
      <div className="absolute inset-0 bg-grid-small-white/[0.04] bg-[size:8px_8px]" />
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
    </div>
  );
} 