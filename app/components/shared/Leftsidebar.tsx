"use client";
import { sidebarLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";


function Leftsidebar() {
  const useRoute = useRouter();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 w-full flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div className="flex gap-4 p-3 cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              height={24}
              width={24}
            />
            <p className="max-lg:hidden text-light-2">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default Leftsidebar;
