"use client";

import React, { useEffect, useRef } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { BorderBeam } from "../ui/border-beam";
import gsap from "gsap";

const Hero = () => {
  // Create refs for elements we want to animate
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const inputGroupRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Create a timeline for smooth sequential animations
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.5,
      },
    });

    // Set initial states
    gsap.set(
      [
        taglineRef.current,
        headingRef.current,
        subHeadingRef.current,
        descriptionRef.current,
        inputGroupRef.current,
        imageRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );

    // Animation sequence
    tl.fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        inputGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        imageRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        "-=0.3"
      );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-[url(/assets/hero-bg.svg)] bg-top bg-no-repeat pt-20">
      <MaxWidthWrapper className="text-center flex justify-center items-center flex-col py-16">
        <p ref={taglineRef} className="font-medium mb-4 opacity-0">
          SHORTEN LINKS
        </p>
        <h1 className="text-5xl max-w-5xl mx-auto font-bold mb-5">
          <span ref={headingRef} className="hero-text block mb-4 opacity-0">
            Create links that perform
          </span>
          <span ref={subHeadingRef} className="text-primary block opacity-0">
            with our powerful URL Shortener
          </span>
        </h1>
        <p ref={descriptionRef} className="text-pretty text-lg max-w-2xl opacity-0">
          Spark instant connections with your audience using trimmed, trustworthy, and trackable
          links within the Bitly Connections Platform.
        </p>
        <div
          ref={inputGroupRef}
          className="flex w-full mt-10 max-w-3xl items-center mb-5 opacity-0"
        >
          <Input
            type="text"
            placeholder="Paste your long url"
            className="rounded-r-none text-lg h-12"
          />
          <Button type="submit" className="rounded-l-none h-12">
            Shorten link
          </Button>
        </div>
      </MaxWidthWrapper>
      <div className="relative">
        <MaxWidthWrapper>
          <div
            ref={imageRef}
            className="relative max-w-5xl max-md:px-5 rounded-lg mx-auto opacity-0"
          >
            <Image src="/assets/hero-img.png" width={1200} height={1200} alt="hero img" />
            <BorderBeam />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white bg-[length:100%_100%] bg-[gradient-to-b from-transparent 0% 90%, white 90%]" />
        </MaxWidthWrapper>
      </div>
    </div>
  );
};

export default Hero;
