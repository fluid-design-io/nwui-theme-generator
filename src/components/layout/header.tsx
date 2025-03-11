import { Navbar, NavbarSection } from "@/components/ui/navbar";
import Logo from "@/components/icon/logo";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { StarIcon } from "@heroicons/react/16/solid";
import { Suspense } from "react";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

async function GitHubStars() {
  "use cache";
  cacheLife("weeks");

  const response = await fetch(
    "https://api.github.com/repos/fluid-design-io/nwui-theme-generator",
  );
  const data = await response.json();
  return (
    <span className="ml-1.5 text-xs font-medium">{data.stargazers_count}</span>
  );
}

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
        {/* 
        //TODO: Add github star tracker
        */}
        <Link
          href="https://github.com/fluid-design-io/nwui-theme-generator"
          className="text-muted-foreground hover:bg-border/35 flex items-center gap-1 p-2"
        >
          <StarIcon className="size-4" />
          <Suspense fallback={<span className="ml-2 text-xs">0</span>}>
            <GitHubStars />
          </Suspense>
        </Link>
        <div className="bg-border h-4 w-px" />
        <ThemeToggle />
      </NavbarSection>
    </Navbar>
  );
}

export default Header;
