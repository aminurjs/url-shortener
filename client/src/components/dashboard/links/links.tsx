import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Links</h1>
        <Button>
          <Link href="/dashboard/links/create">Create Link</Link>
        </Button>
      </div>
    </div>
  );
};

export default Links;
