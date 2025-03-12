export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col pt-15">
      <div className="grid flex-1 grid-cols-[1fr_var(--gutter-width)_minmax(0,var(--breakpoint-2xl))_var(--gutter-width)_1fr] grid-rows-[1fr_auto] overflow-clip [--gutter-width:--spacing(6)] lg:[--gutter-width:--spacing(10)]">
        <div className="text-border col-start-2 row-span-full row-start-1 border-x border-x-current bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-sm:hidden" />
        <div className="text-border col-start-4 row-span-full row-start-1 border-x border-x-current bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-sm:hidden" />
        <div className="col-start-3 row-start-1 max-sm:col-span-full max-sm:col-start-1">
          {children}
        </div>
      </div>
    </main>
  );
}
