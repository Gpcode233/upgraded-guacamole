import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/ncs_logo.png"
        alt="Nigeria Computer Society, SouthEast Zone"
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full"
        priority
      />
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[13px] font-bold uppercase tracking-wide text-white">
          Nigeria Computer Society
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">
          SouthEast Region
        </span>
      </span>
    </span>
  );
}
