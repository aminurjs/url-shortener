"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  let pathSegments = pathname.split("/").filter((segment) => segment);

  if (pathname === "/dashboard") {
    return null;
  }

  if (pathSegments[0] === "dashboard") {
    pathSegments = pathSegments.slice(1);
  }

  return (
    <div>
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/dashboard">
                <HomeIcon className="w-4 h-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;

            return (
              <BreadcrumbItem key={url}>
                <BreadcrumbSeparator />
                {!isLast ? (
                  <BreadcrumbLink className="capitalize">
                    <Link href={url}>{decodeURIComponent(segment)}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="capitalize">
                    {decodeURIComponent(segment)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
