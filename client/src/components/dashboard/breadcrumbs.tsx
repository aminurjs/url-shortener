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
  const pathSegments = pathname.split("/").filter((segment) => segment);

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

          {pathSegments.slice(1).map((segment, index) => {
            const url = `/dashboard/${pathSegments
              .slice(1, index + 2)
              .join("/")}`;
            const isLast = index === pathSegments.length - 2;

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

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem className="hidden md:block">
      <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator className="hidden md:block" />
    <BreadcrumbItem>
      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
