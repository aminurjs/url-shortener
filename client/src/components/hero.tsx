import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-[url(/assets/hero-bg.svg)] bg-top bg-no-repeat">
      <MaxWidthWrapper className="text-center flex justify-center items-center flex-col py-12 ">
        <p className="font-medium mb-5">SHORTEN LINKS</p>
        <h1 className="text-5xl max-w-5xl mx-auto font-semibold mb-5">
          <span className="hero-text block mb-4">Create links that perform</span>
          <span className="text-primary block">with our powerful URL Shortener</span>
        </h1>
        <p className="text-pretty text-lg max-w-2xl ">
          Spark instant connections with your audience using trimmed, trustworthy, and trackable
          links within the Bitly Connections Platform.
        </p>
        <div className="flex w-full mt-10 max-w-3xl items-center">
          <Input type="text" placeholder="Paste your long url" className="rounded-r-none" />
          <Button type="submit" className="rounded-l-none">
            Shorten link
          </Button>
        </div>

        <div className="max-w-5xl mt-12 shadow-lg max-md:px-5">
          <Image src="/assets/hero-img.png" width={1200} height={1200} alt="hero img" />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Hero;
