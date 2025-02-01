import LinkCreate from "@/components/dashboard/links/create/link-create";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreateLink = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-primary text-4xl font-semibold ">Create a Link</h1>
        <p className="text-muted-foreground mb-2">
          You can create 10 more links this month.
          <Button variant={"link"} className="font-normal">
            <Link href="/upgrade-plan">Upgrade for more.</Link>
          </Button>{" "}
        </p>
        <div className=" p-10 bg-white shadow rounded-md">
          <LinkCreate />
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
