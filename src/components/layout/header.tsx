import { Navbar, NavbarSection } from "@/components/ui/navbar";
import Logo from "@/components/icon/logo";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

function Header() {
  return (
    <Navbar className="line-b bg-background !fixed inset-x-0 top-0 z-40 justify-between px-4 after:-bottom-px sm:px-6">
      <Link href="/" aria-label="Home" className="flex items-center gap-2">
        <Logo className="size-10 sm:size-8" />
        <div className="flex flex-col pt-1.5 leading-3.5">
          <span className="font-semibold">NWUI</span>
          <span className="text-muted-foreground text-[11px] tracking-tight uppercase">
            Colors
          </span>
        </div>
      </Link>
      <NavbarSection>
        <ThemeToggle />
      </NavbarSection>
    </Navbar>
  );
}

export default Header;
