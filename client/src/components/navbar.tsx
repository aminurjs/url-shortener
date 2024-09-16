import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  return (
    <div className="shadow-sm absolute top-0 w-full backdrop-blur">
      <MaxWidthWrapper>
        <nav className="w-full py-3 flex justify-between items-center">
          <Link href="/" className="font-semibold text-2xl">
            Shorten
          </Link>
          <div className="flex gap-5">
            <Link href="/signin">
              {" "}
              <Button size="sm" variant="outline">
                Sign-in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign-up</Button>
            </Link>
          </div>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
