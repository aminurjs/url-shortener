import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FacebookIcon, GithubIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-10">
      <MaxWidthWrapper className=" mb-10 pb-10 border-b border-gray-200 flex justify-between md:items-center gap-10 flex-col md:flex-row">
        <div>
          <h2 className="text-3xl font-semibold  text-primary">
            Get latest update and Newsletter
          </h2>
          <p className="text-muted-foreground mt-2">
            Don’t wait make a smart & logical quote here. Its pretty easy.
          </p>
        </div>
        <div className="flex md:w-1/2 max-w-3xl items-center">
          <Input
            type="email"
            placeholder="Email"
            className="rounded-r-none text-lg h-12"
          />
          <Button type="submit" className="rounded-l-none h-12">
            Subscribe
          </Button>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href="/" className="font-semibold text-2xl text-primary ">
          Shorten
        </Link>
        <p className=" text-muted-foreground">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="hidden md:inline-block">
            {" "}
            @Aminur - All right reserved
          </span>
        </p>

        <nav className="flex gap-4 ">
          <a
            href="https://linkedin.com/dev-aminur"
            target="_blank"
            className="text-primary"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://github.com/aminurjs"
            target="_blank"
            className="text-primary"
          >
            <GithubIcon />
          </a>
          <a
            href="https://facebook.com/aminur.net"
            target="_blank"
            className="text-primary"
          >
            {" "}
            <FacebookIcon />
          </a>
        </nav>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
