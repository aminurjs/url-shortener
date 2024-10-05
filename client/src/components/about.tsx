import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

const data = [
  {
    title: "Tailored links",
    subtitle: "Create branded short links that build trust",
    image: "/assets/01_feature-img_desktop@2x.png",
    description:
      "Build strong brand credibility by customizing your links with our trusted link shortener.",
    details: [
      "Activate brand recall effortlessly with custom links that your audience recognizes in seconds.",
      "Drive higher click-through rates and more engagement with a custom domain that’s unique to your brand.",
      "Attract more clicks with polished short links that inspire confidence.",
    ],
  },
  {
    title: "No Cookies, No problem",
    subtitle: "Understand what clicks with your audience",
    image: "/assets/02_feature-img_desktop@2x.png",
    description:
      "Watch your engagement grow with the Bitly URL shortener and discover which channels resonate most with your audience.",
    details: [
      "Observe click statistics and collect real-time data from every click.",
      "Compare campaign performance across online and offline channels.",
      "Gather demographic insights with robust location and device data.",
    ],
  },
  {
    title: "SAY Bye TO Spreadsheets",
    subtitle: "Simplify your workload and do it all in one platform",
    image: "/assets/03_feature-img_desktop@2x.png",
    description:
      "Use our URL shortener to organize your campaigns, share links across your marketing channels, and track everything from one place.",
    details: [
      "Add UTM parameters to your links to track your marketing campaigns and improve customer targeting.",
      "Redirect link destinations at any time to keep your audience clicking on your latest and greatest content.",
      "Shorten multiple links in bulk to build rapid-fire connections.",
      "Connect to other tools using Bitly’s integrations to optimize your workflow.",
    ],
  },
];

const AboutLinks = () => {
  return (
    <>
      {data.map(({ title, subtitle, description, image, details }, i) => (
        <MaxWidthWrapper
          key={title}
          className={`flex flex-col py-20 gap-12 items-center ${
            i === 1 ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <p className="mb-2 uppercase">{title}</p>
              <h2 className="text-primary text-4xl font-semibold mb-2">{subtitle}</h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <ul>
              {details.map((element) => (
                <li className="flex gap-3 mb-3 items-start" key={element}>
                  <span>
                    <BadgeCheck className="text-pretty w-7 h-7" />
                  </span>

                  <span> {element}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl">
            <Image src={image} alt="Feature" width={800} height={800} />
          </div>
        </MaxWidthWrapper>
      ))}
    </>
  );
};

export default AboutLinks;
