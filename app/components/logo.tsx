export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white/80 text-[12px] font-bold tracking-tight text-white"
      >
        SE
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[13px] font-bold uppercase tracking-wide text-white">
          Greater SouthEast
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">
          Nigeria Computer Society
        </span>
      </span>
    </span>
  );
}
