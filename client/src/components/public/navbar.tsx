import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { NavigationMenuDemo } from "./navigation-menu";

const Navbar = () => {
  return (
    <div className="shadow-sm absolute top-0 w-full backdrop-blur z-10">
      <MaxWidthWrapper>
        <div className="w-full py-5 flex items-center gap-5">
          <Link href="/" className="font-semibold text-3xl">
            Shorten
          </Link>
          <div>
            <NavigationMenuDemo />
          </div>
          <div className="flex gap-5 flex-1 justify-end">
            <Link href="/login">
              <Button size="sm" variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign-up</Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
