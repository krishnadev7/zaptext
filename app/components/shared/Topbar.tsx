import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Topbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-light-1 text-heading3-bold max-xs:hidden">Zaptext</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={24}
                width={24}
              />
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher 
            appearance={{
              baseTheme: dark,
              elements:{
                organizationSwitcherTrigger:"py-2 px-4"
              }
            }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
