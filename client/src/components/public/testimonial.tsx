"use client";

import React from "react";
import { InfiniteSlider } from "../ui/inifinite-slider";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "This tool has transformed the way we manage our campaigns. The short links inspire trust and get more clicks.",
    name: "John Doe",
    title: "Marketing Manager at XYZ Corp",
    image: "https://example.com/image1.jpg",
  },
  {
    quote:
      "The ability to customize and track URLs has made a huge difference in our customer engagement.",
    name: "Sarah Lee",
    title: "Digital Strategist at MediaPro",
    image: "https://example.com/image2.jpg",
  },
  {
    quote:
      "I love how simple it is to generate QR codes and track clicks in real-time. This is a game-changer.",
    name: "James Smith",
    title: "Content Creator at SocialBuzz",
    image: "https://example.com/image3.jpg",
  },
  {
    quote:
      "Our brand recall skyrocketed thanks to the custom domain feature. Highly recommended!",
    name: "Emily Brown",
    title: "Brand Manager at Creativex",
    image: "https://example.com/image4.jpg",
  },
  {
    quote:
      "It’s so easy to use and the analytics help us understand our audience better than ever before.",
    name: "Michael Johnson",
    title: "CEO at TechSolutions",
    image: "https://example.com/image5.jpg",
  },
  {
    quote:
      "The interface is intuitive, and the performance tracking has given us valuable insights.",
    name: "Olivia Garcia",
    title: "Growth Hacker at InnovateLabs",
    image: "https://example.com/image6.jpg",
  },
  {
    quote:
      "Shortening multiple links at once saves us so much time! The platform is a must-have.",
    name: "David Wilson",
    title: "Operations Manager at GlobalReach",
    image: "https://example.com/image7.jpg",
  },
  {
    quote:
      "The custom links have helped build trust with our audience and increased click-through rates.",
    name: "Sophia Martinez",
    title: "Lead Developer at WebCore",
    image: "https://example.com/image8.jpg",
  },
  {
    quote:
      "This platform has been a valuable addition to our marketing toolkit. The features are fantastic!",
    name: "Daniel Thomas",
    title: "Marketing Director at BrandBoost",
    image: "https://example.com/image9.jpg",
  },
  {
    quote:
      "The seamless integration with other tools has helped streamline our workflow and improve results.",
    name: "Ava Roberts",
    title: "Product Manager at NexaTech",
    image: "https://example.com/image10.jpg",
  },
];

export function Testimonials() {
  return (
    <div className="py-20 bg-slate-50 overflow-hidden">
      <MaxWidthWrapper className="text-center py-5 mb-6">
        <h2 className="text-primary text-4xl font-semibold mb-5">
          What our customers are saying
        </h2>
        <Button>
          Get started for free <ArrowRight className="ml-2 h-4 w-4" />
        </Button>{" "}
      </MaxWidthWrapper>
      <div className="flex gap-12 flex-col relative z-20 mx-auto  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
        <InfiniteSlider durationOnHover={80} duration={60} gap={24} reverse>
          {testimonials.slice(0, 5).map((item) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-200 bg-gray-100 px-8 py-6 md:w-[450px]"
              key={item.name}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className=" relative z-20 text-sm leading-[1.6] text-pretty font-normal">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                  {/* <div className="w-10 h-10">
                    <Image src="/assets/user.png" height={100} width={100} alt="profile" />
                  </div> */}
                  <span className="flex flex-col gap-1">
                    <span className=" leading-[1.6] text-primary font-medium">
                      {item.name}
                    </span>
                    <span className=" text-sm leading-[1.6] text-muted-foreground font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </InfiniteSlider>
        <InfiniteSlider durationOnHover={80} duration={60} gap={24}>
          {testimonials.slice(5, 10).map((item) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-200 bg-gray-100 px-8 py-6 md:w-[450px]"
              key={item.name}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className=" relative z-20 text-sm leading-[1.6] text-pretty font-normal">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                  {/* <div className="w-10 h-10">
                    <Image src="/assets/user.png" height={100} width={100} alt="profile" />
                  </div> */}
                  <span className="flex flex-col gap-1">
                    <span className=" leading-[1.6] text-primary font-medium">
                      {item.name}
                    </span>
                    <span className=" text-sm leading-[1.6] text-muted-foreground font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
