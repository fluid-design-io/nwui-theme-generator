import { Navbar, NavbarItem, NavbarSection } from "@/components/ui/navbar";
import Logo from "@/components/icon/logo";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

function Header() {
  return (
    <Navbar className='!fixed z-40 inset-x-0 top-0 px-4 line-b after:-bottom-px sm:px-6 bg-background justify-between'>
      <Link href='/' aria-label='Home' className='flex items-center gap-2'>
        <Logo className='size-10 sm:size-8' />
        <div className='flex flex-col leading-3.5 pt-1.5'>
          <span className='font-semibold'>NWUI</span>
          <span className='text-muted-foreground text-[11px] tracking-tight uppercase'>
            Colors
          </span>
        </div>
      </Link>
      <NavbarSection>
        <NavbarItem href='/' current>
          Picker
        </NavbarItem>
        <NavbarItem href='/docs'>Docs</NavbarItem>
        <ThemeToggle />
      </NavbarSection>
    </Navbar>
  );
}

export default Header;
